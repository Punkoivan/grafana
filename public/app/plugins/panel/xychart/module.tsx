import { PanelPlugin } from '@grafana/data';
import { commonOptionsBuilder } from '@grafana/ui';
import { defaultScatterConfig, XYChartOptions, ScatterFieldConfig } from './models.gen';
import { getScatterFieldConfig } from './config';
import { ExplicitEditor } from './ExplicitEditor';
import { XYDimsEditor } from './XYDimsEditor';
import { XYChartPanel2 } from './XYChartPanel2';

export const plugin = new PanelPlugin<XYChartOptions, ScatterFieldConfig>(XYChartPanel2)
  .useFieldConfig(getScatterFieldConfig(defaultScatterConfig))
  .setPanelOptions((builder) => {
    builder
      .addRadio({
        path: 'mode',
        name: 'Mode',
        defaultValue: 'single',
        settings: {
          options: [
            { value: 'xy', label: 'XY (old)' },
            { value: 'explicit', label: 'Explicit' },
          ],
        },
      })
      .addCustomEditor({
        id: 'xyPlotConfig',
        path: 'dims',
        name: 'Data',
        editor: XYDimsEditor,
        showIf: (cfg) => cfg.mode === 'xy',
      })
      .addCustomEditor({
        id: 'yyExplicit',
        path: 'series',
        name: 'Series',
        editor: ExplicitEditor,
        showIf: (cfg) => cfg.mode === 'explicit',
      });

    commonOptionsBuilder.addTooltipOptions(builder);
    commonOptionsBuilder.addLegendOptions(builder);
  });
