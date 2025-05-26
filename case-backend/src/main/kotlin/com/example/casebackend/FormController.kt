package com.example.casebackend

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.sql.Timestamp
import java.time.Instant
import kotlin.String

// Only to prevent cors errors locally
@CrossOrigin(origins = ["http://localhost:4173", "http://localhost:5173"])
@RestController
class FormController(
    val formInputRepository: FormInputRepository,
    val formRepository: FormRepository,
    val memberTypeRepository: MemberTypeRepository
) {
    @PostMapping("/submit-form")
    fun post(@RequestBody req: FormInputRequest): ResponseEntity<Any> {
        val form = formRepository.findById(req.formId)
            .orElseThrow { IllegalArgumentException("Form not found: ${req.formId}") }

        if (form.registrationOpens.isAfter(Instant.now())) {
            return ResponseEntity.badRequest().body("The registration has not opened yet")
        }

        val phoneRegex = Regex("""^\+?[0-9]{7,15}$""")
        if (!phoneRegex.matches(req.phoneNumber)) {
            return ResponseEntity.badRequest().body("Invalid phone number format")
        }

        if (!req.birthDate.toInstant().isBefore(Instant.now())) {
            return ResponseEntity.badRequest().body("Date of birth must be in the past")
        }

        val memberType = memberTypeRepository.findById(req.memberTypeId)
            .orElseThrow { IllegalArgumentException("MemberType not found: ${req.memberTypeId}") }

        val input = FormInput(
            id = java.util.UUID.randomUUID().toString(),
            name = req.name,
            phoneNumber = req.phoneNumber,
            birthDate = req.birthDate,
            form = form,
            memberType = memberType
        )

        formInputRepository.save(input)
        return ResponseEntity(input.toFormInputResponse(), HttpStatus.CREATED)
    }

    @GetMapping("/form/{formId}")
    fun get(@PathVariable("formId") formId: String): ResponseEntity<Form> {
        return ResponseEntity.of(formRepository.findById(formId))
    }
}

data class FormInputResponse(
    val id: String,
    val name: String,
    val phoneNumber: String,
    val birthDate: Timestamp,
    val formId: String,
    val memberTypeId: String
)

data class FormInputRequest(
    val name: String,
    val phoneNumber: String,
    val birthDate: Timestamp,
    val formId: String,
    val memberTypeId: String
)
