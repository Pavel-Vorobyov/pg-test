package com.pavel.monitoring.task

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "Task")
class Task(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long?,

        @NotBlank
        val name: String
)