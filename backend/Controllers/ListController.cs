namespace backend.Controllers;

using backend.DTOs.Request;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

public class ListController : ApiControllerBase
{
    private readonly IListService _service;

    public ListController(IListService service)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
    }

    [HttpPost]
    public async Task<ActionResult<List?>> CreateList(ListRequest request)
    {
        var list = await _service.CreateListAsync(request);
        if (list is null)
        {
            return BadRequest("The projectId doesn't exist");
        }
        return Ok(list);
    }

    [HttpGet("{projectId:int}")]
    public async Task<ActionResult<ICollection<List>>> GetListByProject(int projectId)
    {
        return Ok(await _service.GetListByProjectAsync(projectId));
    }

    [HttpPut("{listId:int}")]
    public async Task<ActionResult<List>> UpdateList(int listId, UpdateListRequest request)
    {
        var list = await _service.Update(listId, request.Title);
        if (list is null)
        {
            return NotFound("List not found");
        }
        return Ok(list);
    }

    [HttpDelete("{listId:int}")]
    public async Task<bool> DeleteList(int listId)
    {
        var list = await _service.Delete(listId);
        if (!list)
        {
            return false;
        }
        return list;
    }
}