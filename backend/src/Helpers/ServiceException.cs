namespace backend.src.Helpers;

using System.Net;

public class ServiceException : Exception
{
    public HttpStatusCode StatusCode { get; private set; }
    public string Message { get; set; } = null!;

    public ServiceException (HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
        Message = message;
    }

    public static ServiceException NotFound(string message = "Id is not found")
    {
        return new ServiceException(HttpStatusCode.NotFound, message);
    }

    public static ServiceException Unauthorized(string message = "Unauthorized")
    {
        return new ServiceException(HttpStatusCode.Unauthorized, message);
    }

    public static ServiceException Forbidden(string message = "That action is Forbidden")
    {
        return new ServiceException(HttpStatusCode.Forbidden, message);
    }
}