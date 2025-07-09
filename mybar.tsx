import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import Gtk from "gi://Gtk?version=4.0"
import AstalTray from "gi://AstalTray"
import GDK from "gi://Gdk?version=4.0"
import { For, With, createBinding } from "ags"
import { createPoll } from "ags/time"

function Tray() {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
    btn.menuModel = item.menuModel
    btn.insert_action_group("dbusmenu", item.actionGroup)
    item.connect("notify::action-group", () => {
      btn.insert_action_group("dbusmenu", item.actionGroup)
    })
  }

  return (
    <box class="capsule" >
      <For each={items}>
        {(item) => (
          <menubutton name="trayitem" $={(self) => init(self, item)}>
            <image class="trayitem" gicon={createBinding(item, "gicon")} />
          </menubutton>
        )}
      </For>
    </box>
  )
}

function Clock() {
    const time = createPoll("", 1000, "date +%a\" \"%d/%m-%Y\" \"%H:%M:%S")
    return (
        <box class="capsule">
            <label class= "item" label={time} />
        </box>
    )
}

export default function Bar(gdkmonitor: GDK.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    return (
        <window 
        visible
        name="bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={app}
        >
            <centerbox>
               <box $type="start">
               
               </box> 
               <box $type="end">
              <Tray /> 
              <Clock />
               </box> 
            </centerbox>
        </window>
    )
}

