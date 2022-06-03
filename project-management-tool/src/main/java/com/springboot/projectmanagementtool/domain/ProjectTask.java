package com.springboot.projectmanagementtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ProjectTask {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(updatable = false)
    private String projectSequence;

    @Column(updatable = false)
    private String projectIdentifier;

    @NotBlank(message = "Please include a project summary")
    private String summary;

    private String acceptanceCriteria;

    private String status;

    private Integer priority;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dueDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date created_at;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date updated_at;

    @PrePersist
    protected void onCreate() {
        this.created_at = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_at = new Date();
    }
}