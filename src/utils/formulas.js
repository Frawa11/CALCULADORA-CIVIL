import React from 'react';

export const FORMULAS_DATA = {
    '/calculators/foundation': {
        title: 'Cimiento Corrido',
        sections: [
            {
                type: 'header',
                content: 'Materiales para 1m³ de Cimiento Corrido'
            },
            {
                type: 'text',
                content: 'Proporción típica utilizada en obra:'
            },
            {
                type: 'highlight',
                content: '1 : 10 + 30% PG (Cemento : Hormigón + Piedra Grande)'
            },
            {
                type: 'table',
                title: 'Datos de Diseño',
                headers: ['Parámetro', 'Valor', 'Unidad'],
                rows: [
                    ['F\'c', '100', 'kg/cm²'],
                    ['Relación a/c', '0.8', '-'],
                    ['Peso bolsa cemento', '42.5', 'kg']
                ]
            },
            {
                type: 'text',
                content: 'Pesos unitarios asumiendo:'
            },
            {
                type: 'list',
                items: [
                    'Peso específico Cemento: 3150 kg/m³',
                    'Peso específico Hormigón: 2700 kg/m³',
                    'Peso específico Agua: 1000 kg/m³',
                    'Desperdicio: 5%',
                    'Aire incorporado: 1%'
                ]
            },
            {
                type: 'header',
                content: 'Cálculo de Materiales por m³'
            },
            {
                type: 'table',
                title: 'Resultados Unitarios (sin desperdicio)',
                headers: ['Material', 'Cantidad', 'Unidad'],
                rows: [
                    ['Cemento', '2.9', 'bolsas'],
                    ['Hormigón', '0.83', 'm³'],
                    ['Piedra Grande', '0.48', 'm³'],
                    ['Agua', '0.10', 'm³']
                ]
            },
            {
                type: 'info',
                content: 'Nota: Los valores pueden variar según la humedad de los agregados y la dosificación específica de la obra.'
            }
        ]
    },
    '/calculators/over-foundation': {
        title: 'Sobrecimiento',
        sections: [
            {
                type: 'header',
                content: 'Materiales para 1m³ de Sobrecimiento'
            },
            {
                type: 'text',
                content: 'Proporción recomendada:'
            },
            {
                type: 'highlight',
                content: '1 : 8 + 25% PM (Cemento : Hormigón + Piedra Mediana)'
            },
            {
                type: 'table',
                title: 'Datos de Diseño',
                headers: ['Parámetro', 'Valor', 'Unidad'],
                rows: [
                    ['F\'c', '140', 'kg/cm²'],
                    ['Relación a/c', '0.8', '-'],
                    ['Peso bolsa cemento', '42.5', 'kg']
                ]
            },
            {
                type: 'text',
                content: 'Pesos unitarios asumiendo:'
            },
            {
                type: 'list',
                items: [
                    'Peso específico Cemento: 3150 kg/m³',
                    'Peso específico Hormigón: 2700 kg/m³',
                    'Peso específico Agua: 1000 kg/m³',
                    'Desperdicio: 5%',
                    'Aire incorporado: 1%'
                ]
            },
            {
                type: 'header',
                content: 'Cálculo de Materiales por m³'
            },
            {
                type: 'table',
                title: 'Resultados Unitarios (con 5% desperdicio)',
                headers: ['Material', 'Cantidad', 'Unidad'],
                rows: [
                    ['Cemento', '3.91', 'bolsas'],
                    ['Hormigón', '0.887', 'm³'],
                    ['Piedra Mediana', '0.42', 'm³'],
                    ['Agua', '0.13', 'm³']
                ]
            },
            {
                type: 'header',
                content: 'Fórmula Geométrica'
            },
            {
                type: 'highlight',
                content: 'Volumen = Largo × Ancho × Alto'
            },
            {
                type: 'info',
                content: 'El cálculo considera el volumen total del sobrecimiento menos el volumen ocupado por la piedra mediana (25%).'
            }
        ]
    },
    '/calculators/footing': {
        title: 'Zapatas',
        sections: [
            {
                type: 'header',
                content: 'Cálculo de Materiales para Zapatas'
            },
            {
                type: 'header',
                content: '1. Volumen de la Zapata'
            },
            {
                type: 'highlight',
                content: 'Vol.(z) = Cantidad × Largo × Ancho × Alto'
            },
            {
                type: 'header',
                content: '2. Volumen Total (con Desperdicio)'
            },
            {
                type: 'highlight',
                content: 'Vol.(T) = Vol.(z) × (1 + %Desperdicio)'
            },
            {
                type: 'text',
                content: 'Se suele considerar un 5% de desperdicio.'
            },
            {
                type: 'header',
                content: '3. Cantidad de Materiales (F\'c 210 kg/cm²)'
            },
            {
                type: 'table',
                title: 'Factores por m³ de Concreto',
                headers: ['Material', 'Factor', 'Unidad'],
                rows: [
                    ['Cemento', '9.73', 'bolsas/m³'],
                    ['Arena', '0.52', 'm³/m³'],
                    ['Piedra', '0.53', 'm³/m³'],
                    ['Agua', '0.186', 'm³/m³']
                ]
            },
            {
                type: 'info',
                content: 'Estos factores corresponden a una resistencia F\'c = 210 kg/cm². Para otras resistencias, los factores varían según la tabla de diseño de mezcla.'
            }
        ]
    },
    '/calculators/columns': {
        title: 'Columnas',
        sections: [
            {
                type: 'header',
                content: 'Cálculo de Materiales para Columnas'
            },
            {
                type: 'header',
                content: '1. Volumen de la Columna'
            },
            {
                type: 'highlight',
                content: 'Vol.(c) = Cantidad × Largo × Ancho × Alto'
            },
            {
                type: 'header',
                content: '2. Volumen del Acero'
            },
            {
                type: 'highlight',
                content: 'Vol.(a) = Cantidad × Área Acero × Alto'
            },
            {
                type: 'text',
                content: 'Se descuenta el volumen que ocupa el acero dentro de la columna.'
            },
            {
                type: 'header',
                content: '3. Volumen Total (Concreto)'
            },
            {
                type: 'highlight',
                content: 'Vol.(T) = [Vol.(c) - Vol.(a)] × (1 + %Desperdicio)'
            },
            {
                type: 'header',
                content: '4. Cantidad de Materiales (F\'c 210 kg/cm²)'
            },
            {
                type: 'table',
                title: 'Factores por m³ de Concreto',
                headers: ['Material', 'Factor', 'Unidad'],
                rows: [
                    ['Cemento', '9.73', 'bolsas/m³'],
                    ['Arena', '0.52', 'm³/m³'],
                    ['Piedra', '0.53', 'm³/m³'],
                    ['Agua', '0.186', 'm³/m³']
                ]
            },
            {
                type: 'info',
                content: 'Nota: El área del acero depende del número y diámetro de las varillas utilizadas.'
            }
        ]
    },
    '/calculators/concrete-1m3': {
        title: 'Concreto Estructural',
        sections: [
            {
                type: 'header',
                content: 'Dosificación de Concreto en Obra'
            },
            {
                type: 'text',
                content: 'Tabla de dosificaciones y materiales por m³ (Fuente: CAPECO):'
            },
            {
                type: 'table',
                title: 'Dosificaciones por Resistencia (F\'c)',
                headers: ['F\'c', 'Prop.', 'Cem.', 'Arena', 'Piedra', 'Agua'],
                rows: [
                    ['140', '1:2.5:3.5', '7.01', '0.51', '0.64', '0.184'],
                    ['175', '1:2.5:2.5', '8.43', '0.54', '0.55', '0.185'],
                    ['210', '1:2:2', '9.73', '0.52', '0.53', '0.186'],
                    ['245', '1:1.5:1.5', '11.50', '0.50', '0.51', '0.187'],
                    ['280', '1:1:1.5', '13.34', '0.45', '0.51', '0.189']
                ]
            },
            {
                type: 'info',
                content: 'Unidades: Cemento (bolsas), Agregados y Agua (m³).'
            },
            {
                type: 'header',
                content: 'Cálculo de Volumen de Balde'
            },
            {
                type: 'highlight',
                content: 'Vol. balde = [(AB + Ab) / 2] × h'
            },
            {
                type: 'text',
                content: 'Donde AB es el área de la boca superior, Ab el área de la base inferior y h la altura.'
            }
        ]
    },
    '/calculators/brick-wall': {
        title: 'Cantidad de Ladrillos',
        sections: [
            {
                type: 'header',
                content: 'Cálculo de Ladrillos por m²'
            },
            {
                type: 'highlight',
                content: '#Ladrillos = 1 / [(L + J) × (H + J)]'
            },
            {
                type: 'list',
                items: [
                    'L: Longitud del ladrillo (m)',
                    'H: Altura del ladrillo (m)',
                    'J: Espesor de la junta (m)'
                ]
            },
            {
                type: 'text',
                content: 'La dimensión a utilizar depende del tipo de asentado:'
            },
            {
                type: 'table',
                title: 'Dimensiones según Asentado (King Kong)',
                headers: ['Tipo', 'Largo (L)', 'Alto (H)', 'Ancho (Muro)'],
                rows: [
                    ['Soga', '0.23 m', '0.09 m', '0.125 m'],
                    ['Cabeza', '0.125 m', '0.09 m', '0.23 m'],
                    ['Canto', '0.23 m', '0.125 m', '0.09 m']
                ]
            },
            {
                type: 'header',
                content: 'Consideraciones'
            },
            {
                type: 'text',
                content: 'Se suele considerar un 5% de desperdicio para el cálculo final.'
            },
            {
                type: 'highlight',
                content: 'Total = #Ladrillos × (1 + %Desperdicio)'
            }
        ]
    },
    '/calculators/plaster': {
        title: 'Tarrajeo de Muros',
        sections: [
            {
                type: 'header',
                content: 'Cálculo de Materiales para Tarrajeo'
            },
            {
                type: 'text',
                content: 'Proporción recomendada:'
            },
            {
                type: 'highlight',
                content: '1 : 4 (Cemento : Arena Fina)'
            },
            {
                type: 'table',
                title: 'Factores por m³ de Mortero (Sin Desperdicio)',
                headers: ['Material', 'Cantidad', 'Unidad'],
                rows: [
                    ['Cemento', '8.9', 'bolsas'],
                    ['Arena Fina', '1.0', 'm³'],
                    ['Agua', '272', 'litros']
                ]
            },
            {
                type: 'header',
                content: 'Cálculo de Volumen'
            },
            {
                type: 'highlight',
                content: 'Volumen = Largo × Alto × Espesor'
            },
            {
                type: 'text',
                content: 'Se recomienda considerar un 5% de desperdicio en los materiales.'
            }
        ]
    },
    '/calculators/weight-volume': {
        title: 'Conversión Peso a Volumen',
        sections: [
            {
                type: 'header',
                content: 'Datos de Conversión'
            },
            {
                type: 'list',
                items: [
                    '1 bolsa de cemento = 42.5 kg',
                    '1 m³ = 35.31 pie³'
                ]
            },
            {
                type: 'header',
                content: 'Procedimiento de Cálculo'
            },
            {
                type: 'text',
                content: '1. Calcular el Peso por Tanda (1 bolsa):'
            },
            {
                type: 'highlight',
                content: 'Peso = Proporción × 42.5 kg'
            },
            {
                type: 'text',
                content: '2. Calcular Peso Volumétrico Húmedo:'
            },
            {
                type: 'highlight',
                content: 'P.V.H. = P.V. Suelto × (1 + %Humedad)'
            },
            {
                type: 'text',
                content: '3. Calcular Volumen en m³:'
            },
            {
                type: 'highlight',
                content: 'Vol (m³) = Peso Tanda / P.V.H.'
            },
            {
                type: 'text',
                content: '4. Convertir a pies cúbicos:'
            },
            {
                type: 'highlight',
                content: 'Vol (pie³) = Vol (m³) × 35.31'
            },
            {
                type: 'info',
                content: 'Este proceso permite ajustar la dosificación en peso a volumen real en obra, corrigiendo por la humedad y densidad de los agregados.'
            }
        ]
    },
    '/calculators/mix-yield': {
        title: 'Rendimiento de Materiales',
        sections: [
            {
                type: 'header',
                content: 'Cálculo de Rendimiento por Bolsa'
            },
            {
                type: 'text',
                content: 'Ejemplo de proporción 1:2:4 con 25L agua:'
            },
            {
                type: 'table',
                title: 'Peso de la Tanda (1 bolsa)',
                headers: ['Material', 'Cálculo', 'Peso (kg)'],
                rows: [
                    ['Cemento', '1 × 42.5', '42.5'],
                    ['Ag. Fino', '2 × 42.5', '85.0'],
                    ['Ag. Grueso', '4 × 42.5', '170.0'],
                    ['Agua', '25 Lt', '25.0'],
                    ['TOTAL', '∑', '322.5']
                ]
            },
            {
                type: 'highlight',
                content: 'Rendimiento = Peso Tanda / Peso Unitario Concreto'
            },
            {
                type: 'text',
                content: 'Para un concreto de 2400 kg/m³:'
            },
            {
                type: 'highlight',
                content: 'Rendimiento = 322.5 / 2400 = 0.134 m³/bolsa'
            },
            {
                type: 'header',
                content: 'Cálculo de Materiales por m³'
            },
            {
                type: 'highlight',
                content: 'Factor Cemento = 2400 / 322.5 = 7.4 bolsas/m³'
            },
            {
                type: 'table',
                title: 'Materiales por m³',
                headers: ['Material', 'Factor × Peso', 'Total'],
                rows: [
                    ['Cemento', '7.4 × 42.5', '315 kg'],
                    ['Ag. Fino', '7.4 × 85', '629 kg'],
                    ['Ag. Grueso', '7.4 × 170', '1258 kg'],
                    ['Agua', '7.4 × 25', '185 Lt']
                ]
            }
        ]
    },
    '/calculators/transport': {
        title: 'Transporte de Concreto',
        sections: [
            {
                type: 'header',
                content: 'Cálculo de Viajes'
            },
            {
                type: 'highlight',
                content: '#Viajes = Volumen Total / Capacidad del Equipo'
            },
            {
                type: 'text',
                content: 'Capacidades estándar utilizadas:'
            },
            {
                type: 'table',
                title: 'Capacidades de Equipos',
                headers: ['Equipo', 'Capacidad (m³)', 'Equivalencia'],
                rows: [
                    ['Carretilla', '0.056 m³', '2 pie³ (aprox)'],
                    ['Buggy', '0.084 m³', '3 pie³ (aprox)'],
                    ['Balde', '0.020 m³', '20 Litros']
                ]
            },
            {
                type: 'info',
                content: 'El número de viajes se redondea al entero superior para asegurar el transporte de todo el volumen.'
            }
        ]
    },
    'default': {
        title: 'Información General',
        sections: [
            {
                type: 'text',
                content: 'Selecciona una calculadora para ver las fórmulas y datos específicos utilizados en los cálculos.'
            },
            {
                type: 'info',
                content: 'Todos los cálculos se basan en estándares de construcción civil peruanos (RNE).'
            }
        ]
    }
};
