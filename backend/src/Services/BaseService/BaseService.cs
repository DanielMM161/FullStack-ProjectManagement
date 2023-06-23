namespace backend.src.Services.BaseService;

using backend.src.Repositories.BaseRepo;
using backend.src.Models;
using backend.src.DTOs;
using backend.src.Helpers;
using AutoMapper;

public class BaseService<T, TReadDto, TCreateDto, TUpdateDto>
    : IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
    where T : BaseModel
    where TReadDto : BaseDTO<T>
    where TCreateDto : BaseDTO<T>
    where TUpdateDto : BaseDTO<T>
{
    protected readonly IMapper _mapper;
    protected readonly IBaseRepo<T> _repo;

    public BaseService(IMapper mapper, IBaseRepo<T> repo) 
    {
        _mapper = mapper;
        _repo = repo;
    }

    public virtual async Task<TReadDto> CreateOneAsync(TCreateDto create) 
    {                
        var entity = _mapper.Map<TCreateDto, T>(create);
        var result =  await _repo.CreateOneAsync(entity);
        if(result is null)
        {
            throw new Exception("Cannot create");
        }
        return _mapper.Map<T, TReadDto>(result);
    }

    public virtual async Task<bool> DeleteOneAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if(entity is null)
        {
            throw ServiceException.NotFound();
        }    
        return await _repo.DeleteOneAsync(entity);
    }

    public async Task<IEnumerable<TReadDto>> GetAllAsync(QueryOptions options)
    {
        var data = await _repo.GetAllAsync(options);
        return _mapper.Map<IEnumerable<T>, IEnumerable<TReadDto>>(data);
    }

    public virtual async Task<TReadDto?> GetByIdAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity is null)
        {
            throw ServiceException.NotFound();
        }
        return _mapper.Map<T, TReadDto>(entity);
    }

    public virtual async Task<TReadDto> UpdateOneAsync(int id, TUpdateDto update)
    {
        var entity = await _repo.GetByIdAsync(id);
        if(entity is null)
        {
            throw ServiceException.NotFound();
        }        
        var result = await _repo.UpdateOneAsync(_mapper.Map<TUpdateDto, T>(update, entity));
        return _mapper.Map<T, TReadDto>(result);
    }
}