import { 
    Menubar,
    MenubarMenu, 
    MenubarTrigger,
} from "../ui/menubar"
import { Link } from '@tanstack/react-router'

export default function Navbar() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    <Link to="/">
                        Home
                    </Link>{' '}
                </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Link to="/events">
                        Events
                    </Link>{' '}
                </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Link to="/create-event">
                        Add Event
                    </Link>{' '}
                </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Link to="/profile">
                        Profile
                    </Link>{' '}
                </MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}
