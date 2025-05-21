using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send-drawing")]
    public async Task<IActionResult> SendDrawing([FromBody] SendDrawingRequest request)
    {

        var body = $@"
            <h2>שלום, {request.RecipientName}!</h2>
            <p>{request.SenderName} שלח לך ציור מהמם!</p>
            <p>הודעה אישית:</p>
            <blockquote>{request.Message}</blockquote>
            <p>תוכל לצפות בציור כאן:</p>
            <a href='{request.DrawingUrl}'>לצפייה בציור</a>
        ";

        await _emailService.SendEmailAsync(request.RecipientEmail, "קיבלת ציור חדש!", body);
        return Ok("הציור נשלח בהצלחה!");
    }
}

public class SendDrawingRequest
{
    public string RecipientEmail { get; set; }
    public string RecipientName { get; set; }
    public string SenderName { get; set; }
    public string DrawingUrl { get; set; }
    public string Message { get; set; }
}
