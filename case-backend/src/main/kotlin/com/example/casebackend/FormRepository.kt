package com.example.casebackend

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.Instant

@Repository
interface FormRepository: JpaRepository<Form, String>

@Entity
data class Form(
    val clubId: String,
    @OneToMany(mappedBy = "form", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonManagedReference
    val memberTypes: List<MemberType> = listOf(),
    @Id
    val formId: String,
    val title: String,
    val registrationOpens: Instant
)
