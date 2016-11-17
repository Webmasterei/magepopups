<?php
class Webmasterei_Magepopups_Model_Trigger {
    /**
     * Provide available options as a value/label array
     *
     * @return array
     */
    public function toOptionArray() {
        return array(
            array('value' => 'print', 'label' => 'Print Button'),
            array('value' => 'email', 'label' => 'Inquiry Email Button'),
        );
    }
}