namespace backend;

using AutoMapper;
using backend.src.DTOs.List;
using backend.src.DTOs.Project;
using backend.src.DTOs.SubTask;
using backend.src.DTOs.Task;
using backend.src.DTOs.User;
using backend.src.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Projects
        CreateMap<Project, ProjectReadDTO>();
        CreateMap<ProjectUpdateDTO, Project>();
        CreateMap<ProjectCreateDTO, Project>();

        // Users
        CreateMap<User, UserReadDTO>();
        CreateMap<UserReadDTO, User>();

        // List
        CreateMap<List, ListReadDTO>();
        CreateMap<ListCreateDTO, List>();
        CreateMap<ListUpdateDTO, List>();

        // Task
        CreateMap<TaskList, TaskReadDTO>();
        CreateMap<TaskList, ListTaskReadDTO>();
        CreateMap<TaskCreateDTO, TaskList>();
        CreateMap<TaskUpdateDTO, TaskList>();

        // SubTask
        CreateMap<TaskList, SubTaskReadDTO>();
        CreateMap<SubTaskCreateDTO, TaskList>();
        CreateMap<SubTaskUpdateDTO, TaskList>();
    }
}