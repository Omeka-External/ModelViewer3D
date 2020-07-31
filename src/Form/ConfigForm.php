<?php
namespace ModelViewer3D\Form;

use Zend\Form\Form;

class ConfigForm extends Form
{
    public function init()
    {
        $this->add([
            'type' => 'text',
            'name' => 'baseURL',
            'options' => [
                'label' => 'Model Viewer 3D base url', // @translate
                'info' => 'Enter the base url where files will be added.', // @translate
            ],
            'attributes' => [
                'required' => true,
                'id' => 'url',
            ],
        ]);
    }
}
