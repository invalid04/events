import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from '../ui/button'

export default function CreateEvent() {
  return (
    <form className='max-w-xl m-auto flex flex-col gap-2'>
        <Input type='text' id='title' placeholder='Title' />

        <Textarea id='desc' placeholder='Type a description' />

        <Input type='text' id='date' placeholder='Date' />

        <Input type='text' id='time' placeholder='Time' />

        <Input type='text' id='location' placeholder='Location' />

        <Input type='text' id='number' placeholder='no. of People' />

        <Button
            type='submit'
        >
            Create
        </Button>
    </form>
  )
}
