using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using YourNamespace.Services;
using static YourNamespace.Services.DalleService;

namespace OpenAI.ImageGeneration.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DalleController : ControllerBase
    {
        private readonly ILogger<DalleController> _logger;
        private readonly DalleService _dalleService;

        public DalleController(ILogger<DalleController> logger, DalleService dalleService)
        {
            _logger = logger;
            _dalleService = dalleService;
        }

        /// <summary>
        /// יוצר תמונה באמצעות DALL-E של OpenAI
        /// </summary>
        [HttpPost("generate")]
        [ProducesResponseType(typeof(ImageGenerationResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //[Authorize(Policy = "UserorOrAdmin")] // דורש הרשאות משתמש או מנהל
        public async Task<IActionResult> GenerateImage([FromBody] ImageGenerationRequest request)
        {
            try
            {
                var result = await _dalleService.GenerateImageAsync(request);

                if (!result.Success)
                {
                    return BadRequest(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בייצור תמונה");
                return StatusCode(500, new ImageGenerationResponse
                {
                    Success = false,
                    ErrorMessage = $"Internal server error: {ex.Message}"
                });
            }
        }

        ///// <summary>
        ///// יוצר תמונה באמצעות DALL-E של OpenAI ושומר אותה בשרת
        ///// </summary>
        //[HttpPost("generate-and-save")]
        //[ProducesResponseType(typeof(ImageGenerationResponse), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        ////[Authorize(Policy = "UserorOrAdmin")] // דורש הרשאות משתמש או מנהל
        //public async Task<IActionResult> GenerateAndSaveImage([FromBody] ImageGenerationRequest request)
        //{
        //    try
        //    {
        //        // ייצור התמונה
        //        var generationResult = await _dalleService.GenerateImageAsync(request);

        //        if (!generationResult.Success)
        //        {
        //            return BadRequest(generationResult);
        //        }

        //        // שמירת התמונה הראשונה בלבד (אם יש)
        //        if (generationResult.ImageUrls.Count > 0)
        //        {
        //            string imageUrl = generationResult.ImageUrls[0];
        //            string? savedPath = await _dalleService.SaveImageAsync(imageUrl, Directory.GetCurrentDirectory());

        //            if (savedPath != null)
        //            {
        //                generationResult.SavedFilePath = savedPath;
        //                _logger.LogInformation("התמונה נשמרה בהצלחה ב-{FilePath}", savedPath);
        //            }
        //            else
        //            {
        //                _logger.LogWarning("לא ניתן היה לשמור את התמונה");
        //            }
        //        }

        //        return Ok(generationResult);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "שגיאה בשמירת התמונה");
        //        return StatusCode(500, new ImageGenerationResponse
        //        {
        //            Success = false,
        //            ErrorMessage = $"Error saving image: {ex.Message}"
        //        });
        //    }
        //}
    }
}