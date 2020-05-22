<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This file contains the version information for the graph submission plugin
 *
 * @package    assignsubmission_graph
 * @copyright 2020 Chloë Smith <1877342@students.wits.ac.za>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version   = 2020033000;
$plugin->requires  = 2014051200;
$plugin->component = 'assignsubmission_graph';
$plugin->maturity = MATURITY_ALPHA; // indicates that plugin is in alpha stage
$plugin->release = 'v1.0.0-a';       // readable version name

$plugin->dependencies = [
  'mod_forum' => ANY_VERSION,
  'mod_data' => TODO
];
