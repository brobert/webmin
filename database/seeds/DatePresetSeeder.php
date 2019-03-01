<?php
use Illuminate\Database\Seeder;


class DatePresetSeeder extends Seeder {

    private $presets = [
        [
            'name' => 'today',
            'begin' => '0_day_ago',
            'end' => '0_day_ago',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'yesterday',
            'begin' => '1_day_ago',
            'end' => '1_day_ago',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'current_week',
            'begin' => '0_week_ago_begin',
            'end' => '0_day_ago',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_7_days',
            'begin' => '7_day_ago',
            'end' => '0_day_ago',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_week',
            'begin' => '1_week_ago_begin',
            'end' => '1_week_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'current_month',
            'begin' => '0_month_ago_begin',
            'end' => '0_day_ago',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_month',
            'begin' => '1_month_ago_begin',
            'end' => '1_month_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_3_month',
            'begin' => '3_month_ago_begin',
            'end' => '1_month_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_6_month',
            'begin' => '6_month_ago_begin',
            'end' => '1_month_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_12_month',
            'begin' => '12_month_ago_begin',
            'end' => '1_month_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'current_quarter',
            'begin' => '0_quarter_ago_begin',
            'end' => '0_quarter_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_quarter',
            'begin' => '1_quarter_ago_begin',
            'end' => '1_quarter_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'current_year',
            'begin' => '0_year_ago_begin',
            'end' => '0_year_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_year',
            'begin' => '1_year_ago_begin',
            'end' => '1_year_ago_end',
            'system' => true,
            'selectable_by_user' => true
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

        foreach ( $this->presets as $preset ) {
            factory(App\Models\DatePreset::class)->create($preset);
        }
    }
}
