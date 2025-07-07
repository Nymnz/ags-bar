import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import Gtk from "gi://Gtk?version=4.0"
import AstalTray from "gi://AstalTray"
import GDK from "gi://Gdk?version=4.0"
import { For, With, createBinding } from "ags"

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
    <box>
      <For each={items}>
        {(item) => (
          <menubutton $={(self) => init(self, item)}>
            <image gicon={createBinding(item, "gicon")} />
          </menubutton>
        )}
      </For>
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
               </box> 
            </centerbox>
        </window>
    )
}

