<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeHoursColumnInTimeEntriesTable extends Migration
{
    public function up()
    {
        Schema::table('time_entries', function (Blueprint $table) {
            $table->float('hours', 8, 2)->change();  // Menja tip kolone sa decimal na float
        });
    }

    public function down()
    {
        Schema::table('time_entries', function (Blueprint $table) {
            $table->decimal('hours', 8, 2)->change();  // Vraća tip na decimal
        });
    }
}
