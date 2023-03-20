namespace backend.src.DTOs.SubTask;

using System.ComponentModel.DataAnnotations;
using backend.src.Models;

public class SubTaskCreateDTO : BaseDTO<TaskList>
{
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public int CreatedById { get; set; }
}