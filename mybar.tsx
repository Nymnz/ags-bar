import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import { createPoll } from "ags/time"
import Tray from "gi://AstalTray"
import { execAsync } from "ags/process"

app.start({
    main() {
        const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
        const clock = createPoll("", 1000, "date")
        const tray = Tray.get_default()
        console.log("Tray items:", tray.get_items);
        for (const item of tray.get_items()) {
            execAsync("echo " + item.title).then(console.log)
            console.log(item.title)
        }

        setTimeout(() => {
            const items = tray.get_items();
            console.log("Items after 5 seconds:", items);

            for (const item of items) {
                console.log("Title:", item.title);
                execAsync("echo " + item.title).then(console.log);
            }
        }, 10000);  // 5000 milliseconds = 5 seconds


        return (
            <window visible anchor={TOP | LEFT | RIGHT}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}

            >
            <centerbox>
            <label $type="start" label={clock} />
            <label $type="center" />
            <label $type="end" label="hello" />
            </centerbox>
            </window>
        )
    },
})
