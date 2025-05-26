package com.example.casebackend

import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.sql.Timestamp

@Repository
interface FormInputRepository: JpaRepository<FormInput, String>

@Entity
data class FormInput(
    @Id
    val id: String,
    val name: String,
    val phoneNumber: String,
    val birthDate: Timestamp,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id")
    val form: Form,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_type_id")
    val memberType: MemberType
) {
    fun toFormInputResponse() = FormInputResponse(
        id,
        name,
        phoneNumber,
        birthDate,
        form.formId,
        memberType.id
    )
}
