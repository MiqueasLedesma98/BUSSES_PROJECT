package com.mobile

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build

class WifiReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

        val isConnected = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val capabilities = cm.getNetworkCapabilities(cm.activeNetwork)
            capabilities?.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) == true
        } else {
            val networkInfo = cm.activeNetworkInfo
            networkInfo != null && networkInfo.type == ConnectivityManager.TYPE_WIFI && networkInfo.isConnected
        }

        if (isConnected) {
            val launchIntent = context.packageManager.getLaunchIntentForPackage(context.packageName)
            launchIntent?.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(launchIntent)
        }
    }
}
