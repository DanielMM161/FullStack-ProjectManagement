namespace backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Consumes(MediaTypeNames.Application.Json)]
[Route("[controller]s")]
public abstract class ApiControllerBase : ControllerBase
{ }