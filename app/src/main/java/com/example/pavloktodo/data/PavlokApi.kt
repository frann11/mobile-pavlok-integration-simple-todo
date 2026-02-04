package com.example.pavloktodo.data

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface PavlokApi {
    @POST("api/v5/stimulus/send")
    suspend fun sendStimulus(
        @Header("Authorization") token: String,
        @Body request: StimulusRequest
    ): Response<Unit>
}

data class StimulusRequest(
    val stimulus: Stimulus
)

data class Stimulus(
    val stimulusType: String,
    val stimulusValue: Int,
    val reason: String
)
