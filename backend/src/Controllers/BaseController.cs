using backend.src.Repositories.BaseRepo;
using backend.src.Services.BaseService;
using Microsoft.AspNetCore.Mvc;

namespace backend.src.Controllers;

public abstract class BaseController<T, TReadDto, TCreateDto, TUpdateDto> : ApiControllerBase
{
    protected readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _service;

    public BaseController(IBaseService<T, TReadDto, TCreateDto, TUpdateDto> service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<TReadDto?>> CreateOne(TCreateDto create)
    {
        return await _service.CreateOneAsync(create);        
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TReadDto?>> GetById([FromRoute] int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpDelete("{id:int}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.DeleteOneAsync(id);        
    }

    [HttpPut("{id:int}")]
    public async Task<TReadDto> Update(int id, TUpdateDto update)
    {
        return await _service.UpdateOneAsync(id, update);        
    }
}