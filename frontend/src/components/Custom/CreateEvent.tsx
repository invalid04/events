import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function CreateEvent() {
  return (
    <form>
        <Label htmlFor='title'>Title</Label>
        <Input type='string' id='title' placeholder='Title' />
    </form>
  )
}
