namespace backend.Test;

using AutoMapper;
using backend.src.DTOs.Comment;
using backend.src.DTOs.List;
using backend.src.DTOs.Project;
using backend.src.DTOs.SubTask;
using backend.src.DTOs.Task;
using backend.src.DTOs.User;
using backend.src.Models;

public static class AutoMapperConfig
{
    public static IMapper Initialize()
    {
        var config = new MapperConfiguration(cfg =>
        {            
            // Projexr
            cfg.CreateMap<Project, ProjectReadDTO>();
            cfg.CreateMap<ProjectUpdateDTO, Project>();
            cfg.CreateMap<ProjectCreateDTO, Project>();

            // Users
            cfg.CreateMap<User, UserReadDTO>();
            cfg.CreateMap<UserCreateDTO, User>();
            cfg.CreateMap<UserReadDTO, User>();

            // List
            cfg.CreateMap<List, ListReadDTO>();
            cfg.CreateMap<ListCreateDTO, List>();
            cfg.CreateMap<ListUpdateDTO, List>();

            // Task
            cfg.CreateMap<TaskList, TaskReadDTO>();
            cfg.CreateMap<TaskList, ListTaskReadDTO>();
            cfg.CreateMap<TaskCreateDTO, TaskList>();
            cfg.CreateMap<TaskUpdateDTO, TaskList>();

            // Comment
            cfg.CreateMap<Comment, CommentReadDTO>();
            cfg.CreateMap<CommentCreateDTO, Comment>();
            cfg.CreateMap<CommentUpdateDTO, Comment>();

            // SubTask
            cfg.CreateMap<TaskList, SubTaskReadDTO>();
            cfg.CreateMap<SubTaskCreateDTO, TaskList>();
            cfg.CreateMap<SubTaskUpdateDTO, TaskList>();      
        });
        return config.CreateMapper();
    }
}