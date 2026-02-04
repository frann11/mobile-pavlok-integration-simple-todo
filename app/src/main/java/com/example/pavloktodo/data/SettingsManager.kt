package com.example.pavloktodo.data

import android.content.Context
import android.content.SharedPreferences

class SettingsManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("voluntad_prefs", Context.MODE_PRIVATE)

    var shockHour: Int
        get() = prefs.getInt("shock_hour", 21)
        set(value) = prefs.edit().putInt("shock_hour", value).apply()

    var shockMinute: Int
        get() = prefs.getInt("shock_minute", 0)
        set(value) = prefs.edit().putInt("shock_minute", value).apply()
}
