MBB:0000 
0x00007fb0e0116268:   90                               nop
0x00007fb0e0116269:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0116258
0x00007fb0e0116271:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0001 
0x00007fb0e011627b:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e011627e:   0f 8d 09 01 00 00                jge    0x00007fb0e011638d
MBB:0002 
0x00007fb0e0116284:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e011628e:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0003 
0x00007fb0e0116298:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e011629b:   0f 8d 20 00 00 00                jge    0x00007fb0e01162c1
MBB:0004 
0x00007fb0e01162a1:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e01162ab:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e01162af:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01162b9:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e01162bc:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0116298
MBB:0005 
0x00007fb0e01162c1:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e01162cb:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01162d5:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e01162df:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e01162e9:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e01162f3:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0116250
0x00007fb0e01162fb:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0116300:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e0116304:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0116248
0x00007fb0e011630c:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0116240
0x00007fb0e0116314:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0116238
0x00007fb0e011631c:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0116230
0x00007fb0e0116324:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e011632e:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0116331:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0116334:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0116338:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e011633b:   48 03 c6                         add    %rsi,%rax
0x00007fb0e011633e:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0116341:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0116344:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0116347:   49 03 f1                         add    %r9,%rsi
0x00007fb0e011634a:   49 03 d2                         add    %r10,%rdx
0x00007fb0e011634d:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0116352:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0116356:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e011635b:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e011635f:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0116363:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0116368:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e011636c:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0116370:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0116375:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0116379:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e011637d:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0116381:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0116385:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0116388:   e9 ee fe ff ff                   jmpq   0x00007fb0e011627b
MBB:0006 
0x00007fb0e011638d:   c3                               retq   
