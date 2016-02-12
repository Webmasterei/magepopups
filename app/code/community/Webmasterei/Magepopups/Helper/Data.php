<?php
/**
 * Sample Widget Helper
 */
class Webmasterei_Magepopups_Helper_Data extends Mage_Core_Helper_Abstract
{
    public function getHomeBlockId()
    {
        return Mage::getStoreConfig('magepopups/magepopups_blocks/magepopups_home',Mage::app()->getStore());
    }
}