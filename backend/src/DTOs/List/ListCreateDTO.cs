namespace backend.src.DTOs.List;

using System.ComponentModel.DataAnnotations;
using backend.src.Models;

public class ListCreateDTO : BaseDTO<List>
{
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public int ProjectId { get; set; }

    public override void UpdateModel(List model)
    {
        throw new NotImplementedException();
    }
}