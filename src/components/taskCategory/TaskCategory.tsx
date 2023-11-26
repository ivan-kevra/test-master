import { FilterValuesType } from "../../state/state"
import style from "./TaskCategory.module.css"
import {FC} from "react"

type TaskPropsType = {
    filter: FilterValuesType
    setFilter: (value: FilterValuesType) => void
    checked: boolean
}

export const TaskCategory: FC<TaskPropsType> = ({filter, checked, setFilter}) => {
    const filterTaskHandler = () => setFilter(filter)
    return(
        <div className={style.container} onClick={filterTaskHandler}>
            <input className={style.input} type="radio" name="task" checked={checked} readOnly/>
            <div className={style.indicator}/>
            <span className={style.text}>{filter}</span>
        </div>
    );
}