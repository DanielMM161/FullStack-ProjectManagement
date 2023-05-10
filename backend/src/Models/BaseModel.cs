namespace backend.src.Models;

using System.ComponentModel.DataAnnotations.Schema;


public abstract class BaseModel
{    
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}