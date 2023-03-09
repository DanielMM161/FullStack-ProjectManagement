namespace backend.Controllers;

using backend.DTOs;
using backend.Models;

public abstract class CrudController<TModel, TDto> : ApiControllerBase
    where TModel : BaseModel
    where TDto : BaseDTO<TModel>
{

}