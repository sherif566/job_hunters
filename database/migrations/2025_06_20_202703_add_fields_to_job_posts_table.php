<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('job_posts', function (Blueprint $table) {
            $table->string('company_name');
            $table->string('location')->nullable();
            $table->string('category');
            $table->string('job_type');
            $table->string('company_website');
            $table->decimal('salary_min', 10, 2);
            $table->decimal('salary_max', 10, 2);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_posts', function (Blueprint $table) {
            $table->dropColumn('company_website','salary_min','salary_max','job_type','category','location','company_name');
        });
    }
};
