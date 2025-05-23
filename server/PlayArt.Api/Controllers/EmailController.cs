using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        [HttpPost]
        [Route("send-email")]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            try
            {
                // קביעת שם הקובץ בהתאם לסוג התבנית
                string templateFile = request.TemplateType?.ToLower() switch
                {
                    "manager" => "ManagerMail.html",
                    "user" => "UserMail.html",
                    _ => "DefaultMail.html" // אפשרות ברירת מחדל אם לא הוגדר
                };

                // קריאה לתבנית HTML עם קידוד UTF-8
                var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", templateFile);
                var htmlTemplate = System.IO.File.ReadAllText(templatePath, System.Text.Encoding.UTF8);

                // החלפת משתנים בתבנית
                var bodyWithHtml = htmlTemplate
                    .Replace("{{Subject}}", request.Subject)
                    .Replace("{{Body}}", request.Body)
                    .Replace("{{SenderName}}", request.SenderName)
                    .Replace("{{ImageUrl}}", request.ImageUrl);

                // שליפת סיסמה מהסביבה
                var smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD");

                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("paintart.rt@gmail.com", smtpPassword),
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("paintart.rt@gmail.com"),
                    Subject = request.Subject,
                    Body = bodyWithHtml,
                    IsBodyHtml = true,
                    BodyEncoding = System.Text.Encoding.UTF8,
                    SubjectEncoding = System.Text.Encoding.UTF8
                };

                mailMessage.To.Add(request.To);
                mailMessage.HeadersEncoding = System.Text.Encoding.UTF8;
                mailMessage.Headers.Add("Content-Type", "text/html; charset=utf-8");

                smtpClient.Send(mailMessage);
                return Ok("Email sent successfully");
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"SMTP error details: {smtpEx}");
                return BadRequest($"SMTP error: {smtpEx.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error details: {ex}");
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
    }

    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string SenderName { get; set; }
        public string ImageUrl { get; set; }
        public string TemplateType { get; set; } 
    }
}
