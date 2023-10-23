import { Tarefa } from '../../utils/model';


import { Box } from "@mui/material";
import { useState } from "react";
import { format, formatDistance, formatRelative, subDays,parseISO } from 'date-fns';
import TaskTags from "../TaskTags/TaskTags";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, 
  Checkbox,
  IconButton,
  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGlobalContext } from '../../utils/global';
import DeleteTaskDialog from '../DeleteTaskDialog/DeleteTaskDialog';
import { useSnackbar } from 'notistack';
import { url_update_task, url_finish_task, url_reopen_task } from "../../utils/api";
import axios from 'axios';

type TaskProps = {
  task: Tarefa;
  onTaskChange: (taskId:number) => void;
}

const Task = (props: TaskProps) => {
  const { task, onTaskChange } = props;

  const { setIsEditingTask, setRefectchTaskStatus, refetchTaskStatus } =
    useGlobalContext();
  const [error, setError] = useState<null | string>(null);

  const [openedDialog, setOpenedDialog] = useState(false);
  const [checked, setChecked] = useState(task.data_conclusao ? [task.id] : [0]);
  const { enqueueSnackbar } = useSnackbar();
  const labelId = `checkbox-list-label-${task.id}`;

  const finishTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = url_finish_task.replace(":id", taskId.toString());
    try {
      await axios.post(custom_task_url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      enqueueSnackbar("Tarefa concluída!", { variant: "success" });
      setRefectchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao tentar concluir a tarefa.", { variant: "error" });
    }
  };

  const reopenTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = url_reopen_task.replace(":id", taskId.toString());
    try {
      await axios.post(custom_task_url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      enqueueSnackbar("Tarefa reaberta!", { variant: "success" });
      setRefectchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao tentar reabrir a tarefa.", { variant: "error" });
    }
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      finishTask();
    } else {
      newChecked.splice(currentIndex, 1);
      reopenTask();
    }

    setChecked(newChecked);
  };

  const deleteTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = url_update_task.replace(":id", taskId.toString());
    try {
      await axios.delete(custom_task_url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      enqueueSnackbar("Tarefa deletada!", { variant: "success" });
      setRefectchTaskStatus(refetchTaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao deletar a tarefa.", { variant: "error" });
    }
  };

  const renderFinishedText = () => {
    if (task.data_conclusao) {
      return format(parseISO(task.data_conclusao), "'Concluído em' dd/MM/yyyy")
    }
    return;
  }

  return (
    <>
      <ListItem
        key={task.id}
        secondaryAction={
          <Box>
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => {
                onTaskChange(task.id);
                setIsEditingTask(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="deletar"
              onClick={() => {
                if (openedDialog === false) {
                  setOpenedDialog(true);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(task.id) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={task.descricao} secondary={renderFinishedText()}/>
        </ListItemButton>
      </ListItem>
      <TaskTags task={task}/>
      <DeleteTaskDialog
        task={task}
        openedDialog={openedDialog}
        deleteCallback={() => {
          setOpenedDialog(false);
          deleteTask();
        }}
        cancelCallback={() => {
          setOpenedDialog(false);
        }}
      />
    </>
  );
};

export default Task;