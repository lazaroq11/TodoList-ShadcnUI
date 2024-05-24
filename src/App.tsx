import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from "./components/ui/label";
import { useToast } from './components/ui/use-toast';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./components/ui/table";


interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function App() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Fazer Compras', completed: false }
  ]);
  const [newTaskName, setNewTaskName] = useState("");

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskName("");
      toast({
        title: "Tarefa Criada com sucesso",
        description: "Você criou a tarefa",
      });
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Tarefa Deletada",
      description: "Você deletou a tarefa",
    });
  };

  return (
    <div className="flex w-full items-center justify-around pt-10 flex-col">
      <h1 className='text-3xl'>TodoList</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='mt-10'>Criar Tarefa</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Criar Nova Tarefa</DialogHeader>
          <DialogDescription>Criar uma nova tarefa para sua lista</DialogDescription>
          <form onSubmit={handleCreateTask}>
            <div className="flex flex-row justify-center items-center gap-2">
              <Label htmlFor="tarefa">Tarefa</Label>
              <Input
                id="tarefa"
                className="focus:outline-none"
                type="text"
                placeholder='Tarefa'
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
            </div>
            <div className="pt-10 flex w-100 justify-around">
              <Button type='submit'>Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <TableCaption className='pt-10 text'>Lista de Tarefas</TableCaption>
      <Table className="w-auto mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Tarefa</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell 
                className={`cursor-pointer ${task.completed ? 'line-through opacity-50' : ''} transition-all duration-300`}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.name}
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
