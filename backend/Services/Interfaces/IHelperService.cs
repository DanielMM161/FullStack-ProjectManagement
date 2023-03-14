using backend.Models;

namespace backend.Services.Interfaces;

public interface IHelpserService
{
    Task<int> CheckUserBelongProject(int userId, Project project);
    Task<List?> CheckListBelongProject(int listId, int projectId);
    Task<Project?> CheckProject(int projectId);
}