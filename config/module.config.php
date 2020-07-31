<?php
namespace ModelViewer3D;

return [
    'view_manager' => [
        'template_path_stack' => [
            dirname(__DIR__) . '/view',
        ],
    ],

    'media_ingesters'=> [
        'invokables' => [
            'model_viewer_3d' => Media\Ingester\ModelViewer3D::class,
        ]
    ],
    
    'media_renderers'=> [
        'invokables' => [
            'model_viewer_3d' => Media\Renderer\ModelViewer3D::class,
        ]
    ]

    
];