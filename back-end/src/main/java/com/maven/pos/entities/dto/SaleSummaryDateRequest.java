package com.maven.pos.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleSummaryDateRequest {

    private LocalDate startDate;

    private LocalDate endDate;
}
