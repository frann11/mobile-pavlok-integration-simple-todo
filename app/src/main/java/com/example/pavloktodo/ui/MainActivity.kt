package com.example.pavloktodo.ui

import android.os.Bundle
import android.util.Log
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.graphics.drawscope.translate
import androidx.compose.ui.graphics.drawscope.withTransform
import androidx.compose.ui.layout.ContentScale
import androidx.compose.animation.core.*
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.ImeAction
import com.example.pavloktodo.data.SettingsManager
import com.example.pavloktodo.work.ZapCheckScheduler
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.time.LocalDate
import java.time.format.TextStyle
import java.util.*
import com.example.pavloktodo.data.PavlokApi
import com.example.pavloktodo.data.AppConfig
import com.example.pavloktodo.data.StimulusRequest
import com.example.pavloktodo.data.Stimulus
import com.example.pavloktodo.data.Pact
import com.example.pavloktodo.data.InMemoryTodoRepository
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

// --- CONFIGURACIÓN DE COLORES (PAPER & INK) ---
val PaperBg = Color(0xFFFDFBF7)
val InkBlue = Color(0xFF0F172A)
val SubGray = Color(0xFF64748B)
val BorderGray = Color(0xFFE2E8F0)
val SuccessGreen = Color(0xFF166534)
val DangerRed = Color(0xFFB91C1C)
val GoldAccent = Color(0xFFB45309)

// --- DayRecord ---
data class DayRecord(
    val date: LocalDate,
    val status: String // "perfect", "good", "broken", "future", "today"
)

data class DoomQuote(
    val line1: String = "LA EXCELENCIA NO ES UN ACTO,",
    val line2: String = "ES UN HÁBITO.",
    val sub: String = "CADA PEQUEÑO ESFUERZO RECONFIGURA TU BIOLOGÍA INTERNA.",
    val tag: String = "NEUROPLASTICIDAD"
)

// --- LÓGICA DE API GEMINI ---
const val API_KEY = "AIzaSyCc4tyZUjsZAei0jOuCV4FJbS0PQTBphtQ" 

suspend fun fetchGemini(prompt: String, isJson: Boolean = false): Result<String> {
    return kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
        val delays = listOf(1000L, 2000L, 4000L, 8000L)
        val urlStr = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=$API_KEY"
        
        var lastException: Exception? = null

        for (delayTime in delays) {
            try {
                val url = URL(urlStr)
                val conn = url.openConnection() as HttpURLConnection
                conn.requestMethod = "POST"
                conn.setRequestProperty("Content-Type", "application/json")
                conn.doOutput = true
                
                val payload = JSONObject().apply {
                    put("contents", org.json.JSONArray().put(JSONObject().apply {
                        put("parts", org.json.JSONArray().put(JSONObject().apply {
                            put("text", prompt)
                        }))
                    }))
                    if (isJson) {
                        put("generationConfig", JSONObject().apply {
                            put("responseMimeType", "application/json")
                        })
                    }
                }
                
                conn.outputStream.use { it.write(payload.toString().toByteArray()) }
                if (conn.responseCode == 200) {
                    val response = conn.inputStream.bufferedReader().use { it.readText() }
                    val jsonResponse = JSONObject(response)
                    val text = jsonResponse.getJSONArray("candidates")
                        .getJSONObject(0)
                        .getJSONObject("content")
                        .getJSONArray("parts")
                        .getJSONObject(0)
                        .getString("text")
                    return@withContext Result.success(text)
                } else {
                    val error = conn.errorStream?.bufferedReader()?.use { it.readText() } ?: "Unknown error"
                    if (conn.responseCode in 400..499) {
                         return@withContext Result.failure(Exception("HTTP ${conn.responseCode}: $error"))
                    }
                    lastException = Exception("HTTP ${conn.responseCode}: $error")
                }
            } catch (e: Exception) {
                lastException = e
                delay(delayTime)
            }
        }
        return@withContext Result.failure(lastException ?: Exception("Unknown error after retries"))
    }
}

// --- COMPONENTES UI ---

@Composable
fun IntegrityRing(score: Int) {
    val ringColor = when {
        score > 80 -> SuccessGreen
        score > 50 -> GoldAccent
        else -> DangerRed
    }

    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(top = 16.dp)) {
        Box(contentAlignment = Alignment.Center, modifier = Modifier.size(180.dp)) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                drawCircle(color = BorderGray.copy(alpha=0.3f), radius = size.minDimension / 2, style = Stroke(width = 25f))
                drawArc(
                    color = ringColor,
                    startAngle = -90f,
                    sweepAngle = (score / 100f) * 360f,
                    useCenter = false,
                    style = Stroke(width = 25f, cap = StrokeCap.Round)
                )
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(text = "$score%", fontSize = 48.sp, fontWeight = FontWeight.Black, fontFamily = FontFamily.Serif, color = InkBlue)
                Text(text = "INTEGRIDAD", fontSize = 11.sp, letterSpacing = 2.sp, fontWeight = FontWeight.Bold, color = SubGray)
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        Box(
            modifier = Modifier.background(Color.White, RoundedCornerShape(20.dp)).border(1.dp, BorderGray, RoundedCornerShape(20.dp)).padding(horizontal = 16.dp, vertical = 6.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("\uD83D\uDD25", fontSize = 12.sp)
                Spacer(modifier = Modifier.width(4.dp))
                Text("NIVEL IV", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = SubGray)
            }
        }
    }
}

@Composable
fun TheChain(history: List<DayRecord>) {
    var expanded by remember { mutableStateOf(false) }
    
    // Generar datos dummy si es la primera vez (Day 0)
    val today = LocalDate.now()
    val displayDays = history.ifEmpty {
        val start = today.minusDays(today.dayOfWeek.value.toLong() - 1)
        (0..6).map { 
           val d = start.plusDays(it.toLong())
           DayRecord(d, if (d.isBefore(today)) "perfect" else if (d == today) "today" else "future")
        }
    }

    Column(modifier = Modifier.fillMaxWidth().padding(horizontal = 24.dp, vertical = 24.dp)) {
        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.DateRange, null, modifier = Modifier.size(16.dp), tint = SubGray)
                Spacer(modifier = Modifier.width(8.dp))
                Text("LA CADENA", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = SubGray, letterSpacing = 1.sp)
            }
            TextButton(onClick = { expanded = !expanded }) {
                Text(if(expanded) "VER MENOS" else "VER TODO EL MES", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = SubGray)
                Icon(if(expanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowRight, null, modifier = Modifier.size(14.dp), tint = SubGray)
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        
        AnimatedVisibility(visible = !expanded) {
            Row(
                modifier = Modifier.fillMaxWidth().shadow(4.dp, RoundedCornerShape(24.dp)).background(Color.White, RoundedCornerShape(24.dp)).padding(horizontal = 16.dp, vertical = 20.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                displayDays.forEach { day ->
                    val label = day.date.dayOfWeek.getDisplayName(TextStyle.NARROW, Locale("es"))
                    Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(if (day.status == "perfect") SuccessGreen else if (day.status == "broken") DangerRed else Color(0xFFF0F0F0))
                                .then(if (day.date == today) Modifier.border(2.dp, InkBlue, CircleShape).padding(2.dp) else Modifier),
                            contentAlignment = Alignment.Center
                        ) {
                            if (day.status == "perfect") Icon(Icons.Default.Check, null, tint = Color.White, modifier = Modifier.size(18.dp))
                            else if (day.status == "broken") Icon(Icons.Default.Close, null, tint = Color.White, modifier = Modifier.size(18.dp))
                            else Text(label, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = if(day.date==today) InkBlue else Color.Gray)
                        }
                    }
                }
            }
        }

        AnimatedVisibility(visible = expanded) {
            Box(
                modifier = Modifier.fillMaxWidth().shadow(4.dp, RoundedCornerShape(24.dp)).background(Color.White, RoundedCornerShape(24.dp)).padding(16.dp)
            ) {
                val currentMonth = today.month
                val firstOfMonth = today.withDayOfMonth(1)
                val daysInMonth = today.lengthOfMonth()
                val offset = firstOfMonth.dayOfWeek.value - 1
                
                Column {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center) {
                         Text(currentMonth.getDisplayName(TextStyle.FULL, Locale("es")).uppercase(), fontSize = 12.sp, fontWeight = FontWeight.Black, color = InkBlue, letterSpacing = 2.sp)
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    
                    val gridItems = (0 until (daysInMonth + offset)).toList()
                    
                    BoxWithConstraints {
                        val cellSize = maxWidth / 7
                        Column {
                            (0 until Math.ceil(gridItems.size / 7.0).toInt()).forEach { week ->
                                Row(modifier = Modifier.fillMaxWidth()) {
                                    (0..6).forEach { dayOfWeek ->
                                        val idx = week * 7 + dayOfWeek
                                        val dayNum = idx - offset + 1
                                        Box(modifier = Modifier.size(cellSize).padding(4.dp), contentAlignment = Alignment.Center) {
                                            if (dayNum in 1..daysInMonth) {
                                                val d = firstOfMonth.withDayOfMonth(dayNum)
                                                Box(
                                                    modifier = Modifier.fillMaxSize().clip(CircleShape)
                                                        .background(if(d.isBefore(today)) SuccessGreen.copy(alpha=0.3f) else if(d==today) InkBlue.copy(alpha=0.1f) else Color.Transparent)
                                                        .then(if(d==today) Modifier.border(1.dp, InkBlue, CircleShape) else Modifier),
                                                    contentAlignment = Alignment.Center
                                                ) {
                                                    Text(dayNum.toString(), fontSize = 10.sp, fontWeight = if(d==today) FontWeight.Bold else FontWeight.Normal)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun PactCard(pact: Pact, onComplete: () -> Unit, onFail: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(modifier = Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier.background(if(pact.status=="signed") Color(0xFFE0E0E0) else if(pact.time == null) Color(0xFFF1F5F9) else Color(0xFFE8F5E9), CircleShape).padding(horizontal = 12.dp, vertical = 8.dp)
            ) {
                Text(pact.time ?: "AL CIERRE", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = if(pact.status=="signed") Color.Gray else if(pact.time == null) SubGray else SuccessGreen)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = pact.title, fontSize = 18.sp, fontWeight = FontWeight.SemiBold, fontFamily = FontFamily.Serif,
                    textDecoration = if (pact.status == "signed") TextDecoration.LineThrough else null,
                    color = if (pact.status == "signed") Color.LightGray.copy(alpha=0.6f) else InkBlue
                )
                Spacer(modifier = Modifier.height(4.dp))
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(pact.category, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = SubGray.copy(alpha=0.8f))
                    if (pact.frequency != "Diario") {
                         Text(pact.frequency, fontSize = 10.sp, fontWeight = FontWeight.Medium, color = SubGray.copy(alpha=0.6f))
                    }
                    if (pact.status == "pending") {
                         Box(modifier = Modifier.background(Color(0xFFFFECB3), RoundedCornerShape(4.dp)).padding(horizontal = 6.dp, vertical = 2.dp)) {
                             Text("Riesgo ${pact.intensity}%", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = Color(0xFFE65100))
                        }
                    }
                }
            }
            if (pact.status == "pending") {
                Spacer(modifier = Modifier.width(8.dp))
                IconButton(onClick = onFail) { Icon(Icons.Default.Close, null, tint = Color.LightGray, modifier = Modifier.size(24.dp)) }
                IconButton(onClick = onComplete, modifier = Modifier.background(InkBlue, CircleShape).size(40.dp)) { 
                    Icon(Icons.Default.Check, null, tint = Color.White, modifier = Modifier.size(20.dp)) 
                }
            }
        }
    }
}

@Composable
fun NeverDoomCard() {
    var quote by remember { mutableStateOf(DoomQuote()) }
    var loading by remember { mutableStateOf(false) }
    var gradientColors by remember { mutableStateOf(listOf(Color(0xFF2C3E50), Color.Black)) }
    var lastError by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    Column(modifier = Modifier.padding(horizontal = 24.dp, vertical = 16.dp)) {
        Row(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Icon(Icons.Default.Star, null, tint = InkBlue, modifier = Modifier.size(16.dp))
                Text("PERSPECTIVA", fontSize = 12.sp, fontWeight = FontWeight.Black, letterSpacing = 2.sp, color = InkBlue)
                Box(modifier = Modifier.background(Color(0xFFE0E0E0), RoundedCornerShape(100)).padding(horizontal = 8.dp, vertical = 2.dp)) {
                    Text("AI", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = SubGray)
                }
            }
            TextButton(onClick = {
                loading = true
                lastError = null
                scope.launch {
                    val prompt = "Genera una frase CORTA e inspiradora basada en ciencia conductual. Responde SOLO con un JSON: { 'line1': '...', 'line2': '...', 'sub': '...', 'tag': '...' }"
                    val result = fetchGemini(prompt, true)
                    result.onSuccess { res ->
                        try {
                            val json = JSONObject(res)
                            quote = DoomQuote(json.getString("line1"), json.getString("line2"), json.getString("sub"), json.getString("tag"))
                            gradientColors = listOf(Color((10..50).random(), (10..50).random(), (10..50).random()), Color.Black)
                        } catch (e: Exception) { lastError = "JSON: ${e.message}" }
                    }.onFailure { lastError = it.message ?: "Error" }
                    loading = false
                }
            }) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Refresh, null, modifier = Modifier.size(12.dp), tint = SubGray)
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(if (loading) "BUSCANDO..." else "NUEVA VISIÓN", fontSize = 10.sp, color = SubGray)
                }
            }
        }
        
        if (lastError != null) Text(lastError!!, color = DangerRed, fontSize = 10.sp, modifier = Modifier.padding(bottom = 8.dp))

        Box(modifier = Modifier.fillMaxWidth().heightIn(min = 400.dp).clip(RoundedCornerShape(24.dp)).background(Color.Black)) {
            Box(modifier = Modifier.fillMaxSize().background(Brush.verticalGradient(gradientColors)))
            Column(modifier = Modifier.fillMaxSize().padding(32.dp), verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(Icons.Default.Star, null, tint = Color.White.copy(alpha = 0.5f), modifier = Modifier.size(24.dp))
                Spacer(modifier = Modifier.height(16.dp))
                Text(text = "\"${quote.line1}\n${quote.line2}\"", color = Color.White, fontSize = 28.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif, fontStyle = FontStyle.Italic, textAlign = TextAlign.Center, lineHeight = 36.sp)
                Spacer(modifier = Modifier.height(24.dp))
                HorizontalDivider(color = Color.White.copy(alpha = 0.3f), modifier = Modifier.width(40.dp))
                Spacer(modifier = Modifier.height(24.dp))
                Text(text = quote.sub, color = Color.White.copy(alpha = 0.8f), fontSize = 11.sp, textAlign = TextAlign.Center, fontWeight = FontWeight.Medium, letterSpacing = 2.sp)
                Spacer(modifier = Modifier.weight(1f))
                Box(modifier = Modifier.border(1.dp, Color.White.copy(alpha=0.3f), RoundedCornerShape(100)).padding(horizontal = 12.dp, vertical = 6.dp)) {
                    Text(quote.tag, color = Color.White.copy(alpha = 0.9f), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
fun SettingsOverlay(settingsMgr: SettingsManager, pavlokApi: PavlokApi, onTestCelebration: (Boolean) -> Unit, onDismiss: () -> Unit) {
    val scope = rememberCoroutineScope()
    var hour by remember { mutableIntStateOf(settingsMgr.shockHour) }
    var minute by remember { mutableIntStateOf(settingsMgr.shockMinute) }
    val context = LocalContext.current

    Dialog(onDismissRequest = onDismiss, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Box(modifier = Modifier.fillMaxSize().background(Color.Black.copy(alpha = 0.6f)).clickable { onDismiss() })
            Card(
                modifier = Modifier.fillMaxWidth(0.9f).wrapContentHeight(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = PaperBg)
            ) {
                Column(modifier = Modifier.padding(32.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Spacer(modifier = Modifier.size(24.dp))
                        Text("REGLA DE ORO", fontSize = 18.sp, fontWeight = FontWeight.Black, fontFamily = FontFamily.Serif)
                        IconButton(onClick = onDismiss) { Icon(Icons.Default.Close, null, tint = SubGray) }
                    }
                    Text("AJUSTA LA HORA DEL JUICIO", fontSize = 12.sp, color = SubGray)
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Button(
                        onClick = {
                            val now = java.util.Calendar.getInstance()
                            now.add(java.util.Calendar.MINUTE, 1)
                            hour = now.get(java.util.Calendar.HOUR_OF_DAY)
                            minute = now.get(java.util.Calendar.MINUTE)
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                        border = BorderStroke(1.dp, InkBlue.copy(alpha=0.5f)),
                        modifier = Modifier.padding(bottom = 16.dp)
                    ) {
                        Text("⚡ TEST: PRÓXIMO MINUTO", color = InkBlue, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }

                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            IconButton(onClick = { hour = (hour + 1) % 24 }) { Icon(Icons.Default.KeyboardArrowUp, null) }
                            Text(hour.toString().padStart(2, '0'), fontSize = 32.sp, fontWeight = FontWeight.Bold)
                            IconButton(onClick = { hour = if (hour == 0) 23 else hour - 1 }) { Icon(Icons.Default.KeyboardArrowDown, null) }
                        }
                        Text(":", fontSize = 32.sp, fontWeight = FontWeight.Bold)
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            IconButton(onClick = { minute = (minute + 5) % 60 }) { Icon(Icons.Default.KeyboardArrowUp, null) }
                            Text(minute.toString().padStart(2, '0'), fontSize = 32.sp, fontWeight = FontWeight.Bold)
                            IconButton(onClick = { minute = if (minute == 0) 55 else minute - 5 }) { Icon(Icons.Default.KeyboardArrowDown, null) }
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(32.dp))
                    Button(
                        onClick = { 
                            settingsMgr.shockHour = hour
                            settingsMgr.shockMinute = minute
                            ZapCheckScheduler.scheduleDailyCheck(context, hour, minute)
                            onDismiss()
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = InkBlue),
                        shape = RoundedCornerShape(12.dp)
                    ) { Text("GUARDAR COMPROMISO") }

                    Spacer(modifier = Modifier.height(24.dp))
                    Text("HERRAMIENTAS DE PRUEBA", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = SubGray)
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedButton(
                                onClick = { 
                                    ProsperityAudio.play(false)
                                    onTestCelebration(false)
                                },
                                modifier = Modifier.weight(1f)
                            ) { Text("NORMAL", fontSize = 9.sp) }
                            
                            OutlinedButton(
                                onClick = { 
                                    ProsperityAudio.play(true)
                                    onTestCelebration(true)
                                },
                                modifier = Modifier.weight(1f)
                            ) { Text("CRÍTICO", fontSize = 9.sp) }
                        }
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedButton(
                                onClick = { 
                                    scope.launch {
                                        try { 
                                            repeat(2) {
                                                pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("vibe", 50, "Test Heartbeat 1")))
                                                delay(150)
                                                pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("vibe", 70, "Test Heartbeat 2")))
                                                delay(500)
                                            }
                                        } catch(e: Exception) {}
                                    }
                                },
                                modifier = Modifier.weight(1f)
                            ) { Text("LATIDO", fontSize = 9.sp) }

                            OutlinedButton(
                                onClick = { 
                                    scope.launch {
                                        try { pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("vibe", 30, "Test Click"))) } catch(e: Exception) {}
                                    }
                                },
                                modifier = Modifier.weight(1f)
                            ) { Text("CLIC", fontSize = 9.sp) }
                        }
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedButton(
                                onClick = { 
                                    scope.launch {
                                        try {
                                            pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("beep", 50, "Test Beep")))
                                            delay(500)
                                            pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("zap", 50, "Test Zap")))
                                        } catch(e: Exception) {}
                                    }
                                },
                                modifier = Modifier.fillMaxWidth()
                            ) { Text("BEEP + ZAP (FAIL TEST)", fontSize = 9.sp) }
                        }
                    }

                }
            }
        }
    }
}

@Composable
fun AddPactDialog(onDismiss: () -> Unit, onAdd: (Pact) -> Unit) {
    var text by remember { mutableStateOf("") }
    var frequency by remember { mutableStateOf("Diario") }
    var selectedDays by remember { mutableStateOf(setOf<Int>()) }
    var hasDeadline by remember { mutableStateOf(false) }
    var hour by remember { mutableIntStateOf(9) }
    var minute by remember { mutableIntStateOf(0) }
    val focusRequester = remember { FocusRequester() }
    
    LaunchedEffect(Unit) {
        kotlinx.coroutines.delay(500)
        focusRequester.requestFocus()
    }
    
    Dialog(onDismissRequest = onDismiss, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Box(modifier = Modifier.fillMaxSize().background(Color.Black.copy(alpha = 0.6f)).clickable { onDismiss() })
            Surface(
                modifier = Modifier.fillMaxWidth(0.9f).wrapContentHeight(),
                shape = RoundedCornerShape(24.dp),
                color = PaperBg
            ) {
                Column(modifier = Modifier.padding(32.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Spacer(modifier = Modifier.size(24.dp))
                        Text("NUEVO COMPROMISO", fontFamily = FontFamily.Serif, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                        IconButton(onClick = onDismiss) { Icon(Icons.Default.Close, null, tint = SubGray) }
                    }
                    
                    OutlinedTextField(
                        value = text, onValueChange = { text = it }, 
                        label = { Text("¿Qué vas a lograr?") },
                        modifier = Modifier.fillMaxWidth().focusRequester(focusRequester),
                        colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = InkBlue, cursorColor = InkBlue),
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done)
                    )
                    
                    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                        Text("HORA LÍMITE:", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = SubGray, modifier = Modifier.weight(1f))
                        Switch(
                            checked = hasDeadline, 
                            onCheckedChange = { hasDeadline = it },
                            colors = SwitchDefaults.colors(checkedThumbColor = InkBlue, checkedTrackColor = InkBlue.copy(alpha=0.3f))
                        )
                    }

                    if (hasDeadline) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center, modifier = Modifier.fillMaxWidth()) {
                            Text(
                                hour.toString().padStart(2, '0'), 
                                modifier = Modifier.clickable { hour = (hour + 1) % 24 }.padding(8.dp),
                                fontWeight = FontWeight.Bold, fontSize = 24.sp
                            )
                            Text(":", fontSize = 24.sp)
                            Text(
                                minute.toString().padStart(2, '0'), 
                                modifier = Modifier.clickable { minute = (minute + 15) % 60 }.padding(8.dp),
                                fontWeight = FontWeight.Bold, fontSize = 24.sp
                            )
                        }
                    } else {
                        Box(modifier = Modifier.fillMaxWidth().background(BorderGray.copy(alpha=0.3f), RoundedCornerShape(8.dp)).padding(12.dp), contentAlignment = Alignment.Center) {
                            Text("SE CIERRA AL FINAL DEL DÍA", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = SubGray)
                        }
                    }

                    Text("FRECUENCIA", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = SubGray)
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        listOf("Diario", "Una vez", "Días").forEach { fmt ->
                            FilterChip(
                                selected = frequency == fmt,
                                onClick = { frequency = fmt },
                                label = { Text(fmt, fontSize = 11.sp) },
                                colors = FilterChipDefaults.filterChipColors(selectedContainerColor = InkBlue, selectedLabelColor = Color.White)
                            )
                        }
                    }
                    
                    if (frequency == "Días") {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            listOf("L", "M", "X", "J", "V", "S", "D").forEachIndexed { index, d ->
                                val dayIdx = index + 1
                                Box(
                                    modifier = Modifier
                                        .size(32.dp).clip(CircleShape)
                                        .background(if (selectedDays.contains(dayIdx)) InkBlue else Color.Transparent)
                                        .border(1.dp, BorderGray, CircleShape)
                                        .clickable { 
                                            selectedDays = if(selectedDays.contains(dayIdx)) selectedDays - dayIdx else selectedDays + dayIdx 
                                        },
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(d, fontSize = 10.sp, color = if(selectedDays.contains(dayIdx)) Color.White else InkBlue)
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Button(
                        onClick = { 
                            if (text.isNotBlank()) {
                                 val freqStr = if (frequency == "Días") selectedDays.joinToString(",") { 
                                     listOf("", "L", "M", "X", "J", "V", "S", "D")[it] 
                                 } else frequency
                                 onAdd(Pact(
                                     id = java.util.UUID.randomUUID().toString(), 
                                     title = text, 
                                     time = if (hasDeadline) "${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}" else null, 
                                     status = "pending", 
                                     frequency = freqStr, 
                                     scheduledDays = selectedDays.toList(),
                                     intensity = 50,
                                     category = "GENERAL"
                                 ))
                            }
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = InkBlue),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text("SELLAR PACTO", fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}

@Composable
fun AppContent(settingsMgr: SettingsManager) {
    val repository = InMemoryTodoRepository
    val threatLevel by repository.currentThreatLevel.collectAsState()
    val integrityScore by repository.integrityScore.collectAsState()
    val pacts by repository.tasks.collectAsState()
    val summary by repository.todaySummary.collectAsState()
    var showReflection by remember { mutableStateOf(false) }
    var showSettings by remember { mutableStateOf(false) }
    var showAddPact by remember { mutableStateOf(false) }
    var showCelebration by remember { mutableStateOf(false) }
    var isCriticalCelebration by remember { mutableStateOf(false) }
    var showSuccessFlash by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    val pavlokApi = remember {
        Retrofit.Builder()
            .baseUrl(AppConfig.backendBaseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(PavlokApi::class.java)
    }

    Scaffold(
        containerColor = PaperBg,
        topBar = {
            Row(modifier = Modifier.fillMaxWidth().statusBarsPadding().padding(horizontal = 24.dp, vertical = 24.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text("Voluntad.", fontSize = 36.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Serif, color = InkBlue)
                IconButton(onClick = { showSettings = true }) {
                    Box(modifier = Modifier.size(40.dp).border(1.dp, BorderGray.copy(alpha = 0.5f), CircleShape), contentAlignment = Alignment.Center) {
                        Icon(Icons.Default.Settings, null, tint = InkBlue, modifier = Modifier.size(20.dp))
                    }
                }
            }
        }
    ) { padding ->
        LazyColumn(modifier = Modifier.padding(padding).fillMaxSize()) {
            item { 
                Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                    IntegrityRing(integrityScore)
                    TheChain(emptyList())
                }
            }
            item {
                Text("PACTOS ABIERTOS", modifier = Modifier.padding(horizontal = 24.dp, vertical = 16.dp), fontSize = 11.sp, fontWeight = FontWeight.Bold, color = SubGray.copy(alpha=0.7f), letterSpacing = 2.sp)
            }
            if (pacts.isEmpty()) {
                item {
                    Column(modifier = Modifier.fillMaxWidth().padding(48.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.List, null, tint = BorderGray, modifier = Modifier.size(64.dp))
                        Spacer(modifier = Modifier.height(16.dp))
                        Text("No hay pactos activos. El vacío es el primer paso hacia la disciplina.", textAlign = TextAlign.Center, color = SubGray, fontSize = 14.sp, fontFamily = FontFamily.Serif, fontStyle = FontStyle.Italic)
                    }
                }
            }
            items(pacts) { pact ->
                Box(modifier = Modifier.padding(horizontal = 24.dp)) {
                    PactCard(pact, 
                        onComplete = { 
                            repository.updateTaskStatus(pact.id, "signed")
                            
                            // Immediate Feedback (BJ Fogg)
                            showSuccessFlash = true
                            scope.launch {
                                delay(300)
                                showSuccessFlash = false
                            }
                            
                            // Subtle Click vibe for everyone
                            scope.launch {
                                try { pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("vibe", 30, "Pact Signed (Click)"))) } catch(e: Exception) {}
                            }

                            // Ambition Check: Is the day heavy enough for a ceremony?
                            val totalWeight = pacts.size // Simple weight for now
                            val isAmbitious = totalWeight >= 3
                            
                            // Roll for Jackpot (10% chance) - only if ambitious
                            val isCritical = isAmbitious && (1..100).random() <= 10
                            isCriticalCelebration = isCritical
                            
                            if (isAmbitious) {
                                showCelebration = true
                                ProsperityAudio.play(isCritical)
                                
                                scope.launch {
                                    // Vibration sequence
                                    try {
                                        if (isCritical) {
                                            // Heartbeat pattern: Tum-Tum... Tum-Tum
                                            repeat(2) {
                                                pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("vibe", 50, "Critical Success (Pulse 1)")))
                                                delay(150)
                                                pavlokApi.sendStimulus(token = "Bearer ${AppConfig.pavlokAccessToken}", request = StimulusRequest(Stimulus("vibe", 70, "Critical Success (Pulse 2)")))
                                                delay(500)
                                            }
                                        } else {
                                            val levels = listOf(40, 50, 60)
                                            levels.forEachIndexed { index, lvl ->
                                                pavlokApi.sendStimulus(
                                                    token = "Bearer ${AppConfig.pavlokAccessToken}",
                                                    request = StimulusRequest(
                                                        stimulus = Stimulus("vibe", lvl, "Pact Success (Step ${index + 1})")
                                                    )
                                                )
                                                delay(400)
                                            }
                                        }
                                    } catch (e: Exception) {
                                        Log.e("AppContent", "Failed to send vibes", e)
                                    }
                                }
                            }
                        },
                        onFail = { 
                            repository.updateTaskStatus(pact.id, "broken")
                            showReflection = true
                            scope.launch {
                                try {
                                    // Negative Reinforcement: Beep first
                                    pavlokApi.sendStimulus(
                                        token = "Bearer ${AppConfig.pavlokAccessToken}",
                                        request = StimulusRequest(
                                            stimulus = Stimulus(
                                                stimulusType = "beep",
                                                stimulusValue = 50,
                                                reason = "Failure Warning: ${pact.title}"
                                            )
                                        )
                                    )
                                    delay(500)
                                    // Then Zap
                                    pavlokApi.sendStimulus(
                                        token = "Bearer ${AppConfig.pavlokAccessToken}",
                                        request = StimulusRequest(
                                            stimulus = Stimulus(
                                                stimulusType = "zap",
                                                stimulusValue = threatLevel,
                                                reason = "Manual fail: ${pact.title}"
                                            )
                                        )
                                    )
                                } catch (e: Exception) {
                                    Log.e("AppContent", "Failed to send zap/beep", e)
                                }
                            }
                        }
                    )
                }
            }
            item {
                Box(modifier = Modifier.padding(horizontal = 24.dp, vertical = 12.dp).fillMaxWidth().dashedBorder(1.dp, SubGray.copy(alpha=0.2f), 12.dp).clickable { showAddPact = true }.padding(24.dp), contentAlignment = Alignment.Center) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                         Icon(Icons.Default.Add, null, tint = SubGray, modifier=Modifier.size(16.dp))
                         Spacer(modifier = Modifier.width(8.dp))
                         Text("NUEVO COMPROMISO", color = SubGray, fontWeight = FontWeight.Bold, fontSize = 12.sp, letterSpacing = 1.sp)
                    }
                }
            }
            item { NeverDoomCard() }
            item { Spacer(modifier = Modifier.height(48.dp)) }
        }
        
        if (showReflection) ReflectionOverlay(onDismiss = { showReflection = false })
        if (showSettings) SettingsOverlay(
            settingsMgr = settingsMgr, 
            pavlokApi = pavlokApi,
            onTestCelebration = { isCritical ->
                isCriticalCelebration = isCritical
                showCelebration = true
            },
            onDismiss = { showSettings = false }
        )
        if (showCelebration) CelebrationOverlay(isCritical = isCriticalCelebration, onDismiss = { showCelebration = false })
        
        // Success Flash Overlay (Ultra subtle green pulse)
        AnimatedVisibility(visible = showSuccessFlash, enter = fadeIn(), exit = fadeOut()) {
            Box(modifier = Modifier.fillMaxSize().background(SuccessGreen.copy(alpha = 0.15f)))
        }
        if (showAddPact) {
            AddPactDialog(
                onDismiss = { showAddPact = false },
                onAdd = { newPact ->
                    repository.addTask(newPact)
                    showAddPact = false 
                }
            )
        }
    }
}

@Composable
fun ReflectionOverlay(onDismiss: () -> Unit) {
    var step by remember { mutableStateOf(1) }
    var analysis by remember { mutableStateOf("") }
    var verdict by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    Dialog(onDismissRequest = onDismiss, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Box(modifier = Modifier.fillMaxSize().background(Color.Black.copy(alpha = 0.6f)).clickable { onDismiss() })
            Card(
                modifier = Modifier.fillMaxWidth(0.9f).wrapContentHeight(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = PaperBg)
            ) {
                Box(modifier = Modifier.padding(32.dp)) {
                    IconButton(onClick = onDismiss, modifier = Modifier.align(Alignment.TopEnd)) { 
                        Icon(Icons.Default.Close, null, tint = SubGray) 
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center, modifier = Modifier.fillMaxWidth()) {
                        if (verdict == null) {
                            Icon(Icons.Default.Warning, null, tint = DangerRed, modifier = Modifier.size(64.dp))
                            Text("AJUSTE DE PROTOCOLO", modifier = Modifier.padding(16.dp), fontWeight = FontWeight.Bold, letterSpacing = 2.sp)
                            if (step == 1) {
                                Text("IDENTIFICA EL FACTOR LIMITANTE", fontSize = 12.sp, color = SubGray)
                                Spacer(modifier = Modifier.height(24.dp))
                                listOf("Fricción Alta", "Falta de Energía", "Olvido").forEach {
                                    Button(onClick = { step = 2 }, modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp), colors = ButtonDefaults.buttonColors(containerColor = Color.White), border = BorderStroke(1.dp, BorderGray)) { Text(it, color = InkBlue) }
                                }
                            } else {
                                OutlinedTextField(value = analysis, onValueChange = { analysis = it }, modifier = Modifier.fillMaxWidth().height(150.dp), placeholder = { Text("¿Qué obstáculo encontraste?") })
                                Spacer(modifier = Modifier.height(24.dp))
                                Button(
                                    onClick = { 
                                        scope.launch { 
                                            // Enhanced prompt: Noble, Human, Deep.
                                            val prompt = """
                                                Eres un mentor noble, profundamente humano y sabio (estilo Marco Aurelio en sus Meditaciones). 
                                                Analiza este obstáculo de alguien que busca su mejor versión: "$analysis".
                                                
                                                Instrucciones:
                                                1. Sé breve (máximo 2 líneas).
                                                2. Habla con nobleza y compasión firme. 
                                                3. No uses títulos heroicos ni psicología de "comandante". 
                                                4. Háblale al núcleo de su humanidad, reconociendo que la lucha es lo que nos hace dignos.
                                                5. Que tus palabras se sientan como un susurro de sabiduría en medio del caos.
                                            """.trimIndent()
                                            verdict = fetchGemini(prompt).getOrNull() ?: "En la calma de tu interior reside la fuerza que buscas." 
                                        } 
                                    }, 
                                    modifier = Modifier.fillMaxWidth(), 
                                    colors = ButtonDefaults.buttonColors(containerColor = InkBlue)
                                ) { Text("OBTENER ESTRATEGIA") }
                            }
                        } else {
                            Card(modifier = Modifier.fillMaxWidth(), border = BorderStroke(2.dp, InkBlue)) {
                                Column(modifier = Modifier.padding(24.dp)) {
                                    Text("RECOMENDACIÓN CIENTÍFICA", fontWeight = FontWeight.Bold, fontSize = 10.sp)
                                    Spacer(modifier = Modifier.height(12.dp))
                                    Text(verdict!!, fontFamily = FontFamily.Serif, fontStyle = FontStyle.Italic)
                                }
                            }
                            Spacer(modifier = Modifier.height(24.dp))
                            Button(onClick = onDismiss, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = InkBlue)) { Text("IMPLEMENTAR Y CONTINUAR") }
                        }
                    }
                }
            }
        }
    }
}

fun Modifier.dashedBorder(width: androidx.compose.ui.unit.Dp, color: Color, radius: androidx.compose.ui.unit.Dp) = drawBehind {
    drawRoundRect(color = color, style = Stroke(width = width.toPx(), pathEffect = androidx.compose.ui.graphics.PathEffect.dashPathEffect(floatArrayOf(10f, 10f), 0f)), cornerRadius = androidx.compose.ui.geometry.CornerRadius(radius.toPx()))
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
        
        // Initialize Repository for persistence
        InMemoryTodoRepository.initialize(this)
        
        val settingsMgr = SettingsManager(this)
        setContent { AppContent(settingsMgr) }
    }
}

// --- CELEBRACIÓN ---

@Composable
fun CelebrationOverlay(isCritical: Boolean = false, onDismiss: () -> Unit) {
    val infiniteTransition = rememberInfiniteTransition()
    val progress by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(if (isCritical) 5000 else 3000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        )
    )

    LaunchedEffect(Unit) {
        delay(if (isCritical) 5500 else 3500)
        onDismiss()
    }

    val particles = remember {
        List(if (isCritical) 150 else 70) {
            object {
                val x = (0..1000).random() / 1000f
                val yStart = -0.1f - (0..500).random() / 1000f
                val speed = if (isCritical) 0.3f + (0..1000).random() / 1000f else 0.5f + (0..1000).random() / 1000f
                val color = if (isCritical) {
                    listOf(GoldAccent, Color(0xFFFFD700), Color(0xFFDAA520)).random()
                } else {
                    listOf(Color.Yellow, Color.Cyan, Color.Magenta, SuccessGreen, GoldAccent).random()
                }
                val size = (10..25).random().dp
                val rotationSpeed = (-10..10).random() * 10f
            }
        }
    }

    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        if (isCritical) {
            // Flash visual sutil
            Box(modifier = Modifier.fillMaxSize().background(GoldAccent.copy(alpha = 0.1f)))
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("ÉXITO CRÍTICO", color = GoldAccent, fontWeight = FontWeight.Black, fontSize = 24.sp, letterSpacing = 4.sp)
                Text("INTEGRIDAD SUPREMA", color = GoldAccent.copy(alpha=0.6f), fontSize = 12.sp)
            }
        }
        
        Canvas(modifier = Modifier.fillMaxSize()) {
            particles.forEach { p ->
                val currentY = (p.yStart + progress * p.speed) * size.height
                val currentX = p.x * size.width
                val rotation = progress * p.rotationSpeed * 360f
                
                withTransform({
                    translate(currentX, currentY)
                    rotate(rotation, pivot = androidx.compose.ui.geometry.Offset.Zero)
                }) {
                    drawRect(color = p.color, size = androidx.compose.ui.geometry.Size(p.size.toPx(), p.size.toPx() / 2))
                }
            }
        }
    }
}

object ProsperityAudio {
    fun play(isCritical: Boolean = false) {
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            try {
                val tg = android.media.ToneGenerator(android.media.AudioManager.STREAM_NOTIFICATION, 90)
                if (isCritical) {
                    tg.startTone(android.media.ToneGenerator.TONE_DTMF_D, 300)
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        tg.startTone(android.media.ToneGenerator.TONE_DTMF_0, 400)
                    }, 400)
                } else {
                    tg.startTone(android.media.ToneGenerator.TONE_PROP_BEEP, 150)
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        tg.startTone(android.media.ToneGenerator.TONE_PROP_BEEP, 150)
                    }, 200)
                    android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                        tg.startTone(android.media.ToneGenerator.TONE_PROP_BEEP2, 300)
                    }, 400)
                }
            } catch (e: Exception) {
                Log.e("ProsperityAudio", "Error playing sound", e)
            }
        }
    }
}
