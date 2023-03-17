using System.Net;

namespace backend.src.Middleware;

public class ErrorResponse
{
    public HttpStatusCode StatusCode { get; set; }
    public string Message { get; set; } = null!;

    public ErrorResponse(HttpStatusCode statusCode, string message)
    {
        StatusCode = statusCode;
        Message = message;
    }
}