using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace YourNamespace.Services
{
    public class DalleService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<DalleService> _logger;
        private readonly string _apiKey;
        private readonly string _apiUrl = "https://api.openai.com/v1/images/generations";

        public DalleService(HttpClient httpClient, IConfiguration configuration, ILogger<DalleService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;

            // קבלת מפתח ה-API מהתצורה או ממשתנה סביבה
            _apiKey = configuration["OpenAI:ApiKey"] ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY_DELL")
                ?? throw new ArgumentNullException("OpenAI API key is missing");

            // הגדרת ה-HttpClient
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
        }

        public class ImageGenerationRequest
        {
            [JsonPropertyName("prompt")]
            public required string Prompt { get; set; }

            [JsonPropertyName("size")]
            public string Size { get; set; } = "1024x1024";

            [JsonPropertyName("n")]
            public int Count { get; set; } = 1;

            [JsonPropertyName("model")]
            public string Model { get; set; } = "dall-e-3";
        }

        public class ImageGenerationResponse
        {
            public List<string> ImageUrls { get; set; } = new();
            public string? SavedFilePath { get; set; }
            public bool Success { get; set; }
            public string? ErrorMessage { get; set; }
        }

        /// <summary>
        /// יוצר תמונה באמצעות DALL-E של OpenAI
        /// </summary>
        /// <param name="request">פרטי הבקשה ליצירת תמונה</param>
        /// <returns>תשובה עם URL לתמונה שנוצרה</returns>
        public async Task<ImageGenerationResponse> GenerateImageAsync(ImageGenerationRequest request)
        {
            try
            {
                _logger.LogInformation("מייצר תמונה עם הפרומפט: {Prompt}", request.Prompt);

                // וידוא תקינות הפרמטרים
                if (string.IsNullOrWhiteSpace(request.Prompt))
                {
                    return new ImageGenerationResponse
                    {
                        Success = false,
                        ErrorMessage = "Prompt cannot be empty"
                    };
                }

                // הגבלת מספר התמונות
                request.Count = Math.Clamp(request.Count, 1, 10);

                // וידוא גודל תקין
                if (!IsValidSize(request.Size))
                {
                    request.Size = "1024x1024"; // שימוש בגודל ברירת מחדל
                }

                // וידוא שימוש במודל תקין
                if (request.Model != "dall-e-2" && request.Model != "dall-e-3")
                {
                    request.Model = "dall-e-3"; // שימוש במודל ברירת מחדל
                }

                // הכנת הבקשה ל-OpenAI
                var requestData = new
                {
                    prompt = request.Prompt,
                    n = request.Count,
                    size = request.Size,
                    model = request.Model,
                    response_format = "url"
                };

                // שליחת הבקשה ל-API
                var response = await _httpClient.PostAsJsonAsync(_apiUrl, requestData);

                // בדיקת תקינות התשובה
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError("OpenAI API error: {StatusCode}, {ErrorContent}",
                        response.StatusCode, errorContent);

                    return new ImageGenerationResponse
                    {
                        Success = false,
                        ErrorMessage = $"OpenAI API error: {errorContent}"
                    };
                }

                // עיבוד התשובה
                var responseContent = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(responseContent);

                var imageUrls = new List<string>();
                var dataArray = doc.RootElement.GetProperty("data");

                foreach (var item in dataArray.EnumerateArray())
                {
                    if (item.TryGetProperty("url", out var urlElement))
                    {
                        imageUrls.Add(urlElement.GetString() ?? string.Empty);
                    }
                }

                return new ImageGenerationResponse
                {
                    Success = true,
                    ImageUrls = imageUrls
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בייצור תמונה");
                return new ImageGenerationResponse
                {
                    Success = false,
                    ErrorMessage = $"Internal server error: {ex.Message}"
                };
            }
        }

        /// <summary>
        /// בודק אם גודל התמונה תקין
        /// </summary>
        private static bool IsValidSize(string size)
        {
            return size switch
            {
                "256x256" => true,
                "512x512" => true,
                "1024x1024" => true,
                "1792x1024" => true,
                "1024x1792" => true,
                _ => false
            };
        }

        /// <summary>
        /// שומר תמונה מ-URL לשרת
        /// </summary>
        public async Task<string?> SaveImageAsync(string imageUrl, string baseDirectory)
        {
            try
            {
                string fileName = $"dalle_image_{DateTime.Now:yyyyMMdd_HHmmss}.png";
                string savePath = Path.Combine(baseDirectory, "wwwroot", "images", fileName);

                // וידוא שהתיקייה קיימת
                Directory.CreateDirectory(Path.GetDirectoryName(savePath) ?? string.Empty);

                // הורדת התמונה
                var imageBytes = await _httpClient.GetByteArrayAsync(imageUrl);
                await File.WriteAllBytesAsync(savePath, imageBytes);

                // החזרת המסלול היחסי
                return $"/images/{fileName}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשמירת התמונה מהכתובת {ImageUrl}", imageUrl);
                return null;
            }
        }
    }
}