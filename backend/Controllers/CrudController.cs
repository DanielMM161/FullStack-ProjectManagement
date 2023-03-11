namespace backend.Controllers;

using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

public abstract class CrudController<TModel, TDto> : ApiControllerBase
    where TModel : BaseModel
    where TDto : BaseDTO<TModel>
{
    protected readonly ICrudService<TModel, TDto> _service;

    public CrudController(ICrudService<TModel, TDto> service)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
    }

    [HttpGet]
    public virtual async Task<ICollection<TModel>> GetAll()
    {
        return await _service.GetAllAsync();
    }

    [HttpGet("{id:int}")]
    public async virtual Task<ActionResult<TModel?>> Get(int id)
    {
        var item = await _service.GetAsync(id);
        if (item is null)
        {
            return NotFound("Item not found");
        }
        return item;
    }

    [HttpPost]
    public async virtual Task<IActionResult> Create(TDto request)
    {
        var item = await _service.CreateAsync(request);
        if (item is null)
        {
            return BadRequest();
        }
        return Ok(item);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TModel?>> Update(int id, TDto request)
    {
        var item = await _service.UpdateAsync(id, request);
        if (item is null)
        {
            return NotFound("Item not found");
        }
        return Ok(item);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        if (await _service.DeleteAsync(id))
        {
            return Ok(true);
        }
        return NotFound("Item is not found");
    }
}