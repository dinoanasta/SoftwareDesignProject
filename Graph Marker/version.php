<?php
/**
 * @package gradingform_graphmarker
 * @copyright 2020, Chloe Smith <1877342@students.wits.ac.za>
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version = 2020033000;      // released Mar 30, 2020
$plugin->requires = 2014051200;   // minimum required version number for Moodle
$plugin->component = 'gradingform_graphmarker';
$plugin->maturity = MATURITY_ALPHA; // indicates that plugin is in alpha stage
$plugin->release = 'v1.0.0-a'       // readable version name

$plugin->dependencies = [
  'mod_forum' => ANY_VERSION,
  'mod_data' => TODO
];
