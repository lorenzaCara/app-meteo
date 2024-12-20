import { Fragment, useId, useState } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import ListItem from './ListItem'
import { Input } from './ui/input'

const List = ({ list }) => {

    const items = Array.from(
            new Array(10)
        ).map((item, index) => { //math random tira fuori un numero random da 0 a 1 ==>  Math.floor(Math.random() * 10)
        return { id: useId(), label: 'item ' + index, checked: index % 2 === 0} 
    })

    const [todos, setTodos] = useState(items); /* metodo che accetta il paramentro con cui inizia. Si realizza con la tecnica del destructuring. */
    const [todoLabel, setTodoLabel] = useState("");

    /* Se voglio checkare le checkbox al click. */
    const onCheck = (id, value) => { /* value è l'evento, ovvero stabilisce il true o false */
        setTodos(todos.map(todo => {
            if (todo.id == id) {
                return {id:todo.id, label:todo.label, checked: value}
            } else {
                return todo;
            }
        }));
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id)); /* Filtra l'array todos mantenendo solo gli elementi il cui id è diverso da quello che vuoi eliminare. Questo produce una nuova copia dell'array senza modificare l'originale.*/
    }

    const updateItem = (item) => { /* gli passo l'item che voglio modificare */
        setTodos(todos.map(todo => todo.id === item.id ? item : todo)); /* modifico solo l'item singolo e ritorno gli stessi items non modificati */
    }
    
    return (
        <Card className="break-inside-avoid">
            <CardHeader>
                <CardTitle>{list.title}</CardTitle>
                <CardDescription>{list.description}</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 flex flex-col">
                <form onSubmit={e => {
                    e.preventDefault();
                    //percorso per vedere in console.log il valore che inserisco dentro all'input
                    setTodos([{id:todoLabel, label:todoLabel, checked:false}, ...todos, ]); //creo un nuovo array che prende i contnuti di todos ma non lo modifico direttamente e ci aggiungo i nuovi elementi. Creo una copia dell'array esistente.
                    setTodoLabel("");
                    }}> {/* quando ho un solo parametro posso omettere le tonde */}
                    <Input name="todoLabel" value={todoLabel} onChange={(e) => setTodoLabel(e.target.value)}/> 
                </form> 
                {todos.filter(item => !item.checked).map(item => (
                    //componente Fragment è la versione esplicitata di <></> e ci da la possibilità di usare la key senza aggiungere un div genitore. VA IMPORTATO DA REACT. Utile per tornare più elementi html in uno
                    <ListItem 
                        key={item.id} 
                        item={item} 
                        onCheck={onCheck} 
                        removeTodo={removeTodo}
                        onItemChange={updateItem}
                        
                        />
                ))}
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger>Completati</AccordionTrigger>
                        <AccordionContent className="gap-4 flex flex-col">
                        {todos.filter(item => item.checked).map(item => (
                            <Fragment key={item.id}>
                                <ListItem 
                                    item = {item} 
                                    onCheck = {onCheck} 
                                    removeTodo = {removeTodo} 
                                    onItemChange={updateItem}
                                />
                            </Fragment>
                        ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export default List