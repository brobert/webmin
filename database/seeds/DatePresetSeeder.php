<?php
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;


class DatePresetSeeder extends Seeder
{
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
            'begin' => 'last_0_week_begin',
            'end' => 'yesterdayo',
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
            'begin' => 'last_1_week_begin',
            'end' => 'last_1_week_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'current_month',
            'begin' => 'last_0_month_begin',
            'end' => '0_day_ago',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_month',
            'begin' => 'last_1_month_begin',
            'end' => 'last_1_month_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_3_month',
            'begin' => 'last_3_month_begin',
            'end' => 'last_1_month_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_6_month',
            'begin' => 'last_6_month_begin',
            'end' => 'last_1_month_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_12_month',
            'begin' => 'last_12_month_begin',
            'end' => 'last_1_month_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'current_quarter',
            'begin' => 'last_0_quarter_begin',
            'end' => 'last_0_quarter_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_quarter',
            'begin' => 'last_1_quarter_begin',
            'end' => 'last_1_quarter_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'current_year',
            'begin' => 'last_0_year_begin',
            'end' => 'last_0_year_end',
            'system' => true,
            'selectable_by_user' => true
        ],
        [
            'name' => 'last_year',
            'begin' => 'last_1_year_begin',
            'end' => 'last_1_year_end',
            'system' => true,
            'selectable_by_user' => true
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create ();

        foreach ( $this->presets as $preset )
        {
            $preset ['system'] = $faker->boolean ( 70 );
            $preset ['selectable_by_user'] = $faker->boolean ( 40 );

            $presetModel = factory ( App\Models\DatePreset::class )->create ( $preset );
            echo "presetModel" . print_r ( $presetModel->toArray (), true );

            if ($preset ['selectable_by_user'])
            {

                $presetModel->user ()->attach ( $faker->randomElement ( [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8
                ], 3 ) );
                $presetModel->save ();
            }
        }
    }
}
