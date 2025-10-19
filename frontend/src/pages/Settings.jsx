import React, { useState } from "react";

function Settings(){

    const [notify, setNotify] = useState(false)
    return(
        <div className="p-5 bg-white rounded-2xl shadow-md">
            <h1 className="text-2xl font-semibold mb-4">⚙️ Settings</h1>
            <div className="p-5 bg-white rounded-2xl shadow-md">
                <div className="flex justify-between items-center flex-row">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Notifications & Reminders</h2>
                        <p className="text-m italic">Turn on/off notifications from habique</p>
                    </div>
                    <label className="relative inline-block w-10 h-6 cursor-pointer">
                        <input type="checkbox" className="peer sr-only" />
                        <span
                            className="absolute inset-0 rounded-full border-2 border-[#414141] transition-all duration-300 ease-out peer-checked:border-[#0974f1] peer-checked:shadow-[0_0_12px_rgba(9,117,241,0.8)]"
                        ></span>
                        <span
                            className="absolute left-[0.2em] bottom-[0.2em] h-[1em] w-[1em] rounded-full bg-blue-800 transition-all duration-300 ease-out peer-checked:translate-x-[1.25em]"
                        ></span>
                    </label>
                </div>
            </div>
        </div>
    )
}
export default Settings