pragma solidity ^0.7.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    constructor(){
        createTask("Your first task is created");
    }

    //dictionary
    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );


    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        //these events can be subscribed inside any client side application to know that something completed
        emit TaskCreated(taskCount,_content,false);
    }

    function toggleTaskCompleted(uint _id) public{
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id,_task.completed);
    }
}