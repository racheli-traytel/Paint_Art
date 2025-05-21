using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlayArt.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIpaintings : ControllerBase
    {

        [HttpGet("aiDrawingInstructions")]
        public async Task<string> AiDrawingInstructions([FromQuery] string path)
        {
            string base64Image = await ConvertImageToBase64Async(path);

            string apiKey = Environment.GetEnvironmentVariable("OPENAI_PAINTING_KEY");
            string endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}";

            var payload = new
            {
                contents = new[]
                {
               new {
                   parts = new object[]
                   {
                      new { text = "תן הוראות כלליות לצביעה של התמונה המצורפת, כולל המלצות לצבעים עיקריים בלבד, בלי פתיחה." },
                       new {
                           inlineData = new {
                               mimeType = "image/jpeg",
                               data = base64Image
                           }
                       }
                   }
               }
           }
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var client = new HttpClient();

            var response = await client.PostAsync(endpoint, content);
            string result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return $"API Error: {result}";
            }

            using JsonDocument doc = JsonDocument.Parse(result);
            var root = doc.RootElement;

            if (root.TryGetProperty("candidates", out var candidates) &&
                candidates.GetArrayLength() > 0)
            {
                var firstCandidate = candidates[0];

                if (firstCandidate.TryGetProperty("content", out var content2) &&
                    content2.TryGetProperty("parts", out var parts) &&
                    parts.GetArrayLength() > 0)
                {
                    var firstPart = parts[0];
                    if (firstPart.TryGetProperty("text", out var text))
                    {
                        return text.GetString();
                    }
                }
            }

            return "No text found in the response.";
        }


        private async Task<string> ConvertImageToBase64Async(string imageUrl)
        {
            using var httpClient = new HttpClient();
            byte[] imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
            return Convert.ToBase64String(imageBytes);
        }

    }
}
