<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropForDeleteColumnFromTasksTable extends Migration
{
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('for_delete');  // Briše kolonu 'for_delete'
        });
    }

    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->text('for_delete')->nullable();  // Ponovno dodaje kolonu 'for_delete'
        });
    }
}
